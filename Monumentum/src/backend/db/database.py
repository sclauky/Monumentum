import os
from collections.abc import AsyncGenerator

from dotenv import load_dotenv
from sqlalchemy import inspect, text
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from sqlmodel import SQLModel

from models.collection import CollectionEntry


load_dotenv()

DATABASE_URL = os.getenv("DATABASE_URL")

if DATABASE_URL is None:
    raise RuntimeError("DATABASE_URL is not defined")


engine = create_async_engine( #gérer automatiquement la connexion
    DATABASE_URL,
    echo=True,
)


async_session = async_sessionmaker( #créer des sessions de connexion à la db
    engine,
    class_=AsyncSession,
    expire_on_commit=False,
)


async def get_session() -> AsyncGenerator[AsyncSession, None]: #crée réellement une session, la donne à la route et la ferme automatiquement.
    async with async_session() as session:
        yield session

async def create_db_and_tables() -> None: #créer tables
    async with engine.begin() as connection: #connection avec la db
        await connection.run_sync(SQLModel.metadata.create_all)
        user_columns = await connection.run_sync(
            lambda sync_connection: {
                column["name"]
                for column in inspect(sync_connection).get_columns("user")
            }
        )

        for column in ("nom", "prenom", "pseudo"):
            if column not in user_columns:
                await connection.execute(
                    text(
                        f'ALTER TABLE "user" ADD COLUMN "{column}" '
                        "VARCHAR NOT NULL DEFAULT ''"
                    )
                )

        if "photo_url" not in user_columns:
            await connection.execute(
                text('ALTER TABLE "user" ADD COLUMN "photo_url" VARCHAR')
            )

        statut_type = CollectionEntry.__table__.c.statut.type
        if connection.dialect.name == "postgresql" and statut_type.name:
            enum_labels = await connection.execute(
                text(
                    "SELECT enumlabel FROM pg_enum "
                    "WHERE enumtypid = CAST(:type_name AS regtype)"
                ),
                {"type_name": statut_type.name},
            )
            existing_labels = set(enum_labels.scalars())

            for old_label, new_label in (
                ("A_VOIR", "A_DECOUVRIR"),
                ("VU", "TERMINE"),
            ):
                if old_label in existing_labels and new_label not in existing_labels:
                    await connection.execute(
                        text(
                            f'ALTER TYPE "{statut_type.name}" '
                            f"RENAME VALUE '{old_label}' TO '{new_label}'"
                        )
                    )
                    existing_labels.remove(old_label)
                    existing_labels.add(new_label)
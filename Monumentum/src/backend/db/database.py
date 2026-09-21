import os
from collections.abc import AsyncGenerator

from dotenv import load_dotenv
from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)

from sqlmodel import SQLModel


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
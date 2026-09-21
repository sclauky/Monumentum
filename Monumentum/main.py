from contextlib import asynccontextmanager
from fastapi import FastAPI
from db.database import create_db_and_tables
from models.monument import Monument


@asynccontextmanager
async def lifespan(app: FastAPI):
    await create_db_and_tables()
    yield


app = FastAPI(
    title="Monuments de France API",
    description="API pour gérer une collection de monuments français.",
    version="1.0.0",
    lifespan=lifespan,
)
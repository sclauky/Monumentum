from contextlib import asynccontextmanager
from fastapi import FastAPI
from db.database import create_db_and_tables


@asynccontextmanager 
async def lifespan(app: FastAPI):
    await create_db_and_tables() #on crée les tables au démarage
    yield


app = FastAPI(
    title="Monumentum API",
    description="API de gestion d'une collection de monuments français.",
    version="1.0.0",
    lifespan=lifespan,
)
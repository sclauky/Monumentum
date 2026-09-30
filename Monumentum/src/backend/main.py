from contextlib import asynccontextmanager

from fastapi import Request
from fastapi.exceptions import HTTPException as FastAPIHTTPException
from fastapi.responses import JSONResponse
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from db.database import create_db_and_tables

from models.monument import Monument
from models.user import User
from models.collection import CollectionEntry
from models.comment_like import CommentLike

from routers.auth import router as auth_router
from routers.items import router as items_router
from routers.collection import router as collection_router


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


@app.exception_handler(FastAPIHTTPException)
async def http_exception_handler(
    request: Request,
    exc: FastAPIHTTPException,
):
    return JSONResponse(
        status_code=exc.status_code,
        content={
            "erreur": {
                "code": exc.status_code,
                "message": str(exc.detail),
            }
        },
        headers=exc.headers,
    )

app.include_router(auth_router)
app.include_router(items_router)
app.include_router(collection_router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
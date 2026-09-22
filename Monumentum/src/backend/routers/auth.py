from fastapi import APIRouter


router = APIRouter( # créé un mini routeur
    prefix="/auth",
    tags=["Auth"],
)
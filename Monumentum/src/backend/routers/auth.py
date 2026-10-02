from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from core.security import create_access_token, hash_password, verify_password
from schemas.auth import (
    LoginRequest,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from db.database import get_session
from models.user import User
from dependencies.auth import get_current_user


router = APIRouter(  # créé un mini routeur
    prefix="/auth",
    tags=["Auth"],
)


@router.post("/register", ...)
async def register(
    request: RegisterRequest,
    session: AsyncSession = Depends(get_session),
):
    if not validate_password(request.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
        )

    
async def register(
    request: RegisterRequest,  # Le corps JSON de la requête doit correspondre à RegisterRequest
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(User).where(User.email == request.email)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user is not None:  # 409 Conflict si l'utilisateur existe déjà
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Un utilisateur avec cet email existe déjà",
        )

    password_hash = hash_password(request.password)

    user = User(
        email=request.email,
        password_hash=password_hash,
    )

    session.add(user)  # ajoute l'utilisateur à la session

    await session.commit()  # commit pour sauvegarder l'utilisateur dans la DB

    await session.refresh(user)

    return UserResponse(
        id=user.id,
        email=user.email,
    )


@router.post(
    "/login",
    response_model=TokenResponse,
)
async def login(
    request: LoginRequest,
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(User).where(User.email == request.email)
    )

    user = result.scalar_one_or_none()

    if user is None or not verify_password(
        request.password,
        user.password_hash,
    ):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Email ou mot de passe incorrect",
        )

    access_token = create_access_token(
        {"sub": str(user.id)}
    )

    return TokenResponse(
        access_token=access_token,
        token_type="bearer",
    )
    
@router.get(
    "/me",
    response_model=UserResponse,
)

async def get_me(
    current_user: User = Depends(get_current_user),
):
    return UserResponse(
        id=current_user.id,
        email=current_user.email,
    )
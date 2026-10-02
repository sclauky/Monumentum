from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from core.security import create_access_token, hash_password, verify_password
from schemas.auth import (
    LoginRequest,
    ProfileUpdate,
    RegisterRequest,
    TokenResponse,
    UserResponse,
)
from db.database import get_session
from models.user import User
from dependencies.auth import get_current_user
from fastapi import APIRouter, Depends, File, HTTPException, UploadFile, status


router = APIRouter(
    prefix="/auth",
    tags=["Auth"],
)


def validate_password(password: str) -> bool:
    return (
        len(password) >= 8
        and any(char.isupper() for char in password)
        and any(char.islower() for char in password)
        and any(char.isdigit() for char in password)
    )


@router.post(
    "/register",
    status_code=status.HTTP_201_CREATED,
    response_model=UserResponse,
)
async def register(
    request: RegisterRequest,
    session: AsyncSession = Depends(get_session),
):
    if not validate_password(request.password):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule et un chiffre",
        )

    result = await session.execute(
        select(User).where(User.email == request.email)
    )

    existing_user = result.scalar_one_or_none()

    if existing_user is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Un utilisateur avec cet email existe déjà",
        )

    password_hash = hash_password(request.password)

    user = User(
        email=request.email,
        password_hash=password_hash,
        nom=request.nom,
        prenom=request.prenom,
        pseudo=request.pseudo,
    )

    session.add(user)

    await session.commit()
    await session.refresh(user)

    return UserResponse(
        id=user.id,
        email=user.email,
        nom=user.nom,
        prenom=user.prenom,
        pseudo=user.pseudo,
        photo_url=user.photo_url,
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
        nom=current_user.nom,
        prenom=current_user.prenom,
        pseudo=current_user.pseudo,
        photo_url=current_user.photo_url,
    )


@router.patch(
    "/me",
    response_model=UserResponse,
)
async def update_profile(
    request: ProfileUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    current_user.email = request.email
    current_user.nom = request.nom
    current_user.prenom = request.prenom
    current_user.pseudo = request.pseudo

    session.add(current_user)

    await session.commit()
    await session.refresh(current_user)

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        nom=current_user.nom,
        prenom=current_user.prenom,
        pseudo=current_user.pseudo,
        photo_url=current_user.photo_url,
    )
    
@router.post(
    "/me/photo",
    response_model=UserResponse,
)
async def upload_profile_photo(
    photo: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    if not photo.content_type or not photo.content_type.startswith("image/"):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Le fichier doit être une image",
        )

    extension = photo.filename.split(".")[-1] if photo.filename else "jpg"

    filename = f"user_{current_user.id}.{extension}"

    upload_dir = "uploads/profiles"
    os.makedirs(upload_dir, exist_ok=True)

    file_path = os.path.join(upload_dir, filename)

    with open(file_path, "wb") as file:
        file.write(await photo.read())

    current_user.photo_url = f"/uploads/profiles/{filename}"

    session.add(current_user)
    await session.commit()
    await session.refresh(current_user)

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        nom=current_user.nom,
        prenom=current_user.prenom,
        pseudo=current_user.pseudo,
        photo_url=current_user.photo_url,
    )
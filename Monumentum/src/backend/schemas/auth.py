from pydantic import BaseModel


class RegisterRequest(BaseModel):
    email: str
    password: str
    nom: str
    prenom: str
    pseudo: str


class UserResponse(BaseModel):
    id: int
    email: str
    nom: str
    prenom: str
    pseudo: str
    photo_url: str | None = None


class LoginRequest(BaseModel):
    email: str
    password: str


class TokenResponse(BaseModel):
    access_token: str
    token_type: str


class ProfileUpdate(BaseModel):
    email: str
    nom: str
    prenom: str
    pseudo: str
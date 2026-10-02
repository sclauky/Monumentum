from sqlmodel import Field, SQLModel


class User(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    email: str
    password_hash: str

    nom: str
    prenom: str
    pseudo: str

    photo_url: str | None = None
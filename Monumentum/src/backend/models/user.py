from sqlmodel import Field, SQLModel


class User(SQLModel, table=True): # créé un modèle user 
    id: int | None = Field(default=None, primary_key=True) # identifiant

    email: str
    password_hash: str
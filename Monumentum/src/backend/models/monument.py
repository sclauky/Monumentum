from enum import Enum #permet de définir un ensemble fermé de valeurs possibles
from sqlmodel import Field, SQLModel


class Rarete(str, Enum):
    COMMUN = "commun"
    RARE = "rare"
    SUPER_RARE = "super rare"
    GATEKEEPED = "gatekeeped"


class Monument(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    titre: str
    categorie: str
    description: str
    image_url: str
    annee: int

    ville: str
    architecte: str

    rarete: Rarete
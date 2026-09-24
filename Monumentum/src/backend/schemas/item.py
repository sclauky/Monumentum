from pydantic import BaseModel, ConfigDict

from models.monument import Rarete


class Item(BaseModel):
    model_config = ConfigDict(from_attributes=True) # crée un modèle Pydantic à partir d'un modèle SQLAlchemy

    id: int
    titre: str
    categorie: str
    description: str
    image_url: str
    annee: int
    ville: str
    architecte: str
    rarete: Rarete


class ItemListResponse(BaseModel):
    total: int
    page: int
    limit: int
    results: list[Item]
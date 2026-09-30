from datetime import datetime

from pydantic import BaseModel

from schemas.item import Item

from models.collection import Statut


class CollectionCreate(BaseModel): # frontend envoie ces données pour créer une entrée dans la collection
    item_id: int
    statut: Statut
    note: float | None = None
    commentaire: str | None = None


class CollectionUpdate(BaseModel): 
    statut: Statut | None = None
    note: float | None = None
    commentaire: str | None = None


class CollectionEntryResponse(BaseModel): # ce que renvoie l'API
    id: int
    statut: Statut
    note: float | None
    commentaire: str | None
    date_ajout: datetime
    item: Item
    
class CollectionStatsResponse(BaseModel):
    total: int
    par_statut: dict[str, int]
    note_moyenne: float
    
class CommentResponse(BaseModel):
    id: int
    user_id: int
    note: float | None
    commentaire: str
    date_ajout: datetime
    likes: int


class MonumentCommentsResponse(BaseModel):
    commentaires: list[CommentResponse]
    note_moyenne: float
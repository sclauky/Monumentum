from datetime import datetime
from enum import Enum

from sqlmodel import Field, SQLModel


class Statut(str, Enum): # 3 états possibles
    A_DECOUVRIR = "a_decouvrir"
    EN_COURS = "en_cours"
    TERMINE = "termine"


class CollectionEntry(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id") # à quel utilisateur appartient l'entrée
    item_id: int = Field(foreign_key="monument.id") # à quel monument appartient l'entrée

    statut: Statut
    note: float | None = None
    commentaire: str | None = None

    date_ajout: datetime = Field(default_factory=datetime.now)
    

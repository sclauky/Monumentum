from typing import Literal

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlmodel import select

from db.database import get_session
from dependencies.auth import get_current_user
from models.collection import CollectionEntry, Statut
from models.monument import Monument
from models.user import User
from schemas.collection import (
    CollectionCreate,
    CollectionEntryResponse,
    CollectionStatsResponse,
    CollectionUpdate,
)


router = APIRouter(
    prefix="/me/collection",
    tags=["Collection"],
)


@router.get(
    "",
    response_model=list[CollectionEntryResponse],
)
async def get_collection(
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(CollectionEntry).where(
            CollectionEntry.user_id == current_user.id
        )
    )

    entries = result.scalars().all()

    results = []

    for entry in entries:
        item_result = await session.execute(
            select(Monument).where(Monument.id == entry.item_id)
        )

        item = item_result.scalar_one()

        results.append(
            CollectionEntryResponse(
                id=entry.id,
                statut=entry.statut,
                note=entry.note,
                commentaire=entry.commentaire,
                date_ajout=entry.date_ajout,
                item=item,
            )
        )

    return results

@router.post(
    "",
    response_model=CollectionEntryResponse,
    status_code=status.HTTP_201_CREATED,
)
async def add_to_collection(
    request: CollectionCreate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    # Vérifie que le monument existe
    result = await session.execute(
        select(Monument).where(Monument.id == request.item_id)
    )
    

    monument = result.scalar_one_or_none()

    if monument is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item introuvable",
        )
        
    if request.statut == Statut.VU:
        if request.note is None or not 1 <= request.note <= 5:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Une note entre 1 et 5 est obligatoire pour un monument vu",
            )

    # Vérifie que l'utilisateur ne possède pas déjà ce monument
    result = await session.execute(
        select(CollectionEntry).where(
            CollectionEntry.user_id == current_user.id,
            CollectionEntry.item_id == request.item_id,
        )
    )

    existing_entry = result.scalar_one_or_none()

    if existing_entry is not None:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Ce monument est déjà dans votre collection",
        )

    entry = CollectionEntry( # associe l'utilisateur connecté
        user_id=current_user.id,
        item_id=request.item_id,
        statut=request.statut,
        note=request.note,
        commentaire=request.commentaire,
    )

    session.add(entry)

    await session.commit()
    await session.refresh(entry)

    return CollectionEntryResponse(
        id=entry.id,
        statut=entry.statut,
        note=entry.note,
        commentaire=entry.commentaire,
        date_ajout=entry.date_ajout,
        item=monument,
    )
    
    
@router.patch(
    "/{entry_id}",
    response_model=CollectionEntryResponse,
)
async def update_collection_entry(
    entry_id: int,
    request: CollectionUpdate,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(CollectionEntry).where(
            CollectionEntry.id == entry_id, # on ne peut modifier que ses propres entrées
            CollectionEntry.user_id == current_user.id,
        )
    )

    entry = result.scalar_one_or_none()

    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entrée introuvable",
        )

    new_statut = request.statut if request.statut is not None else entry.statut
    new_note = request.note if request.note is not None else entry.note

    if new_statut == Statut.VU:
        if new_note is None or not 1 <= new_note <= 5:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Une note entre 1 et 5 est obligatoire pour un monument vu",
            )

    if request.statut is not None:
        entry.statut = request.statut

    if request.note is not None:
        entry.note = request.note

    if request.commentaire is not None:
        entry.commentaire = request.commentaire

    session.add(entry)

    await session.commit()
    await session.refresh(entry)

    result = await session.execute(
        select(Monument).where(Monument.id == entry.item_id)
    )

    monument = result.scalar_one()

    return CollectionEntryResponse(
        id=entry.id,
        statut=entry.statut,
        note=entry.note,
        commentaire=entry.commentaire,
        date_ajout=entry.date_ajout,
        item=monument,
    )
    
@router.delete(
    "/{entry_id}",
    status_code=status.HTTP_204_NO_CONTENT,
)
async def delete_from_collection(
    entry_id: int,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(CollectionEntry).where(
            CollectionEntry.id == entry_id,
            CollectionEntry.user_id == current_user.id,
        )
    )

    entry = result.scalar_one_or_none()

    if entry is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Entrée introuvable",
        )

# supprime l'entrée de la collection
    await session.delete(entry)
    await session.commit()
    
@router.get("", response_model=list[CollectionEntryResponse])
async def get_collection(
    statut: Statut | None = None,
    tri: Literal["date", "note"] | None = None,
    current_user: User = Depends(get_current_user),
    session: AsyncSession = Depends(get_session),
):
    query = select(CollectionEntry).where(
        CollectionEntry.user_id == current_user.id
    )

    if statut is not None:
        query = query.where(CollectionEntry.statut == statut)

    if tri == "date":
        query = query.order_by(CollectionEntry.date_ajout.desc())

    if tri == "note":
        query = query.order_by(CollectionEntry.note.desc())

    result = await session.execute(query)
    entries = result.scalars().all()

    results = []

    for entry in entries:
        item_result = await session.execute(
            select(Monument).where(Monument.id == entry.item_id)
        )
        item = item_result.scalar_one()

        results.append(
            CollectionEntryResponse(
                id=entry.id,
                statut=entry.statut,
                note=entry.note,
                commentaire=entry.commentaire,
                date_ajout=entry.date_ajout,
                item=item,
            )
        )

    return results

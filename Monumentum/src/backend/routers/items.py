from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import func
from sqlmodel import select

from db.database import get_session
from models.monument import Monument
from schemas.item import Item, ItemListResponse


router = APIRouter(
    prefix="/items",
    tags=["Items"],
)


@router.get(
    "",
    response_model=ItemListResponse,
)
async def get_items(
    q: str | None = None,
    categorie: str | None = None,
    page: int = Query(1, ge=1),
    limit: int = Query(12, ge=1, le=50),
    session: AsyncSession = Depends(get_session),
):
    query = select(Monument)

    if q:
        query = query.where(Monument.titre.contains(q))

    if categorie:
        query = query.where(Monument.categorie == categorie)

    count_query = select(func.count()).select_from(query.subquery())

    total_result = await session.execute(count_query)
    total = total_result.scalar_one()

    query = query.offset((page - 1) * limit).limit(limit)

    result = await session.execute(query)
    monuments = result.scalars().all()

    return ItemListResponse(
        total=total,
        page=page,
        limit=limit,
        results=[
            Item.model_validate(monument)
            for monument in monuments
        ],
    )


@router.get(
    "/{item_id}",
    response_model=Item,
)
async def get_item(
    item_id: int,
    session: AsyncSession = Depends(get_session),
):
    result = await session.execute(
        select(Monument).where(Monument.id == item_id)
    )

    monument = result.scalar_one_or_none()

    if monument is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Item introuvable",
        )

    return Item.model_validate(monument)
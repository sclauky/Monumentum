from sqlmodel import Field, SQLModel


class CommentLike(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")
    entry_id: int = Field(foreign_key="collectionentry.id")
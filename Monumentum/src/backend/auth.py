from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class user(BaseModel):
    username: str
    email: str
    password: str = Field(..., min_length=8)


@app.post("auth/register")
def register_user(new_user: user):
    # Implementer enregistrement de user
    pass
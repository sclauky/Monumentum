from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI()

class user(BaseModel):
    username: str
    email: str
    password: str


@app.post("auth/register")
def register_user(new_user: user):
    # Implementer enregistrement de user
    
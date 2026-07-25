from pydantic import BaseModel
from typing import Optional
from datetime import date

class Recorrencia(BaseModel):
    id: str
    favorecido: str
    documento: str
    valorMaximo: float
    dataFim: date
    status: str

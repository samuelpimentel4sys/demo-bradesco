
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Literal

app = FastAPI()

# Configuração de CORS para permitir requisições do frontend Angular
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4200"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de dados
class Recorrencia(BaseModel):
    id: int
    beneficiario: str
    valor: float
    status: Literal["ativa", "pausada", "pendente_aprovacao"]

# Mock do banco de dados em memória
recorrencias_db = [
    Recorrencia(id=1, beneficiario="Netflix", valor=39.90, status="ativa"),
    Recorrencia(id=2, beneficiario="Spotify", valor=21.90, status="ativa"),
    Recorrencia(id=3, beneficiario="Amazon Prime", valor=14.90, status="pendente_aprovacao"),
    Recorrencia(id=4, beneficiario="Academia", valor=120.00, status="pausada"),
]

@app.get("/")
def read_root():
    return {"Hello": "World"}

# Endpoint para NAI-59
@app.get("/api/recorrencias", response_model=List[Recorrencia])
def get_recorrencias():
    """
    Retorna a lista de recorrências cadastradas.
    """
    return recorrencias_db

# Endpoints para NAI-61
@app.post("/api/recorrencias/{recorrencia_id}/approve")
def approve_recorrencia(recorrencia_id: int):
    """
    Aprova uma recorrência com status 'pendente_aprovacao'.
    """
    item = next((r for r in recorrencias_db if r.id == recorrencia_id), None)
    if not item:
        raise HTTPException(status_code=404, detail=f"Recorrência com ID {recorrencia_id} não encontrada")
    
    # Em um app real, haveria a mudança de estado aqui.
    # item.status = "ativa"
    
    return {"message": f"Recorrência {recorrencia_id} aprovada com sucesso"}

@app.post("/api/recorrencias/{recorrencia_id}/pause")
def pause_recorrencia(recorrencia_id: int):
    """
    Pausa uma recorrência 'ativa'.
    """
    item = next((r for r in recorrencias_db if r.id == recorrencia_id), None)
    if not item:
        raise HTTPException(status_code=404, detail=f"Recorrência com ID {recorrencia_id} não encontrada")
    
    # item.status = "pausada"
    
    return {"message": f"Recorrência {recorrencia_id} pausada com sucesso"}

@app.post("/api/recorrencias/{recorrencia_id}/cancel")
def cancel_recorrencia(recorrencia_id: int):
    """
    Cancela uma recorrência.
    """
    item = next((r for r in recorrencias_db if r.id == recorrencia_id), None)
    if not item:
        raise HTTPException(status_code=404, detail=f"Recorrência com ID {recorrencia_id} não encontrada")
        
    # Em um app real, o item seria removido ou marcado como 'cancelado'
    # recorrencias_db = [r for r in recorrencias_db if r.id != recorrencia_id]

    return {"message": f"Recorrência {recorrencia_id} cancelada com sucesso"}

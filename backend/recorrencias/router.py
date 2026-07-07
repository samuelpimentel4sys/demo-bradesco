from fastapi import APIRouter, HTTPException
from typing import List
from . import schemas
from . import service

router = APIRouter()

@router.get("/api/recorrencias", response_model=List[schemas.Recorrencia])
async def get_recorrencias():
    """
    Retorna a lista de autorizações de Pix Automático (mockado).
    """
    return service.get_recorrencias_mock()

@router.post("/api/recorrencias/{recorrencia_id}/approve", status_code=204)
async def approve_recorrencia(recorrencia_id: str):
    """
    Aprova uma autorização de Pix Automático.
    """
    if not service.update_status_mock(recorrencia_id, "ATIVO"):
        raise HTTPException(status_code=404, detail="Recorrência não encontrada")
    return

@router.post("/api/recorrencias/{recorrencia_id}/pause", status_code=204)
async def pause_recorrencia(recorrencia_id: str):
    """
    Pausa uma autorização de Pix Automático.
    """
    if not service.update_status_mock(recorrencia_id, "PAUSADO"):
        raise HTTPException(status_code=404, detail="Recorrência não encontrada")
    return

@router.post("/api/recorrencias/{recorrencia_id}/cancel", status_code=204)
async def cancel_recorrencia(recorrencia_id: str):
    """
    Cancela uma autorização de Pix Automático.
    """
    if not service.update_status_mock(recorrencia_id, "CANCELADO"):
        raise HTTPException(status_code=404, detail="Recorrência não encontrada")
    return

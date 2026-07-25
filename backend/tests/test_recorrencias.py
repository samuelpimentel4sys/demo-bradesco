import pytest
from fastapi.testclient import TestClient
from backend.main import app

# Adicionar o router de recorrências ao app para teste
from backend.recorrencias.router import router as recorrencias_router
app.include_router(recorrencias_router)

client = TestClient(app)

def test_get_recorrencias_success():
    response = client.get("/api/recorrencias")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]

def test_approve_recorrencia_success():
    response = client.post("/api/recorrencias/rec_1/approve")
    assert response.status_code == 204

def test_approve_recorrencia_not_found():
    response = client.post("/api/recorrencias/rec_inexistente/approve")
    assert response.status_code == 404
    assert response.json() == {"detail": "Recorrência não encontrada"}

def test_pause_recorrencia_success():
    response = client.post("/api/recorrencias/rec_2/pause")
    assert response.status_code == 204

def test_cancel_recorrencia_success():
    response = client.post("/api/recorrencias/rec_2/cancel")
    assert response.status_code == 204

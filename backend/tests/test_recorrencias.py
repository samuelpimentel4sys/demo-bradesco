
import pytest
from fastapi.testclient import TestClient
from ..main import app

client = TestClient(app)

# --- Testes para NAI-59: GET /api/recorrencias ---

def test_get_recorrencias_retorna_200_e_lista(monkeypatch):
    # TC-59-01
    response = client.get("/api/recorrencias")
    assert response.status_code == 200
    data = response.json()
    assert isinstance(data, list)
    assert len(data) > 0
    assert "id" in data[0]
    assert "beneficiario" in data[0]
    assert "valor" in data[0]
    assert "status" in data[0]

def test_get_recorrencias_contrato_tipos_e_status(monkeypatch):
    # TC-59-02
    response = client.get("/api/recorrencias")
    assert response.status_code == 200
    data = response.json()
    for item in data:
        assert isinstance(item["id"], int)
        assert isinstance(item["beneficiario"], str)
        assert isinstance(item["valor"], float)
        assert isinstance(item["status"], str)
        assert item["status"] in ["ativa", "pausada", "pendente_aprovacao"]

def test_post_em_recorrencias_retorna_405(monkeypatch):
    # TC-59-03
    response = client.post("/api/recorrencias", json={})
    assert response.status_code == 405

def test_get_recorrencias_content_type_json(monkeypatch):
    # TC-59-04
    response = client.get("/api/recorrencias")
    assert response.headers["content-type"] == "application/json"

def test_get_recorrencias_lista_vazia(monkeypatch):
    # TC-59-05
    # Simulando uma base de dados vazia
    # Esta é uma abordagem simples; em um projeto real, usaria fixtures de banco de dados
    from ..main import recorrencias_db
    original_data = recorrencias_db.copy()
    recorrencias_db.clear()
    
    response = client.get("/api/recorrencias")
    assert response.status_code == 200
    assert response.json() == []

    # Restaurar dados para não afetar outros testes
    recorrencias_db.extend(original_data)


# --- Testes para NAI-61: Ações POST ---

def test_approve_recorrencia_retorna_200():
    # TC-61-01
    response = client.post("/api/recorrencias/3/approve")
    assert response.status_code == 200
    assert response.json() == {"message": "Recorrência 3 aprovada com sucesso"}

def test_pause_recorrencia_retorna_200():
    # TC-61-02
    response = client.post("/api/recorrencias/1/pause")
    assert response.status_code == 200
    assert response.json() == {"message": "Recorrência 1 pausada com sucesso"}

def test_cancel_recorrencia_retorna_200():
    # TC-61-03
    response = client.post("/api/recorrencias/2/cancel")
    assert response.status_code == 200
    assert response.json() == {"message": "Recorrência 2 cancelada com sucesso"}

def test_acao_id_inexistente_retorna_404():
    # TC-61-04
    response_approve = client.post("/api/recorrencias/999/approve")
    assert response_approve.status_code == 404
    assert response_approve.json() == {"detail": "Recorrência com ID 999 não encontrada"}

    response_pause = client.post("/api/recorrencias/999/pause")
    assert response_pause.status_code == 404

    response_cancel = client.post("/api/recorrencias/999/cancel")
    assert response_cancel.status_code == 404

def test_acao_id_nao_numerico_retorna_422():
    # TC-61-05
    response = client.post("/api/recorrencias/abc/approve")
    assert response.status_code == 422 # FastAPI converte para 422 por padrão em falha de conversão de tipo de path param

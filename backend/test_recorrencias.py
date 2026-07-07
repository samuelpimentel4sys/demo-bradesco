from fastapi.testclient import TestClient
# A importação do 'app' pode precisar de ajuste dependendo da estrutura final do projeto
# Exemplo: from app.main import app
# Por enquanto, vamos assumir que ele estará acessível a partir de um diretório superior
from ..main import app 

client = TestClient(app)

# Mock da base de dados ou da resposta que o serviço de domínio retornaria.
# Na implementação real, o ideal é usar um patch para substituir a dependência
# que busca os dados, em vez de alterar o app diretamente.
MOCK_RECORRENCIAS = [
    {"id": 1, "beneficiario": "Samuel Pimentel", "valor": 150.75, "status": "ativa"},
    {"id": 2, "beneficiario": "Empresa de Streaming", "valor": 49.90, "status": "pausada"},
    {"id": 3, "beneficiario": "Academia", "valor": 120.00, "status": "pendente_aprovacao"},
    {"id": 4, "beneficiario": "Curso Online", "valor": 99.50, "status": "cancelada"},
]

# Sobrescrevendo a dependência para os testes
# Isto é uma simplificação. O ideal seria usar monkeypatch do pytest.
app.dependency_overrides['get_recorrencias_service'] = lambda: MOCK_RECORRENCIAS


def test_get_recorrencias_retorna_200_e_lista():
    """NAI-59: Testa se a rota GET /api/recorrencias retorna status 200 e uma lista."""
    response = client.get("/api/recorrencias")
    assert response.status_code == 200
    assert isinstance(response.json(), list)
    assert response.json() == MOCK_RECORRENCIAS

def test_get_recorrencias_estrutura_dos_itens():
    """NAI-59: Testa a estrutura e os tipos de dados de um item na lista de recorrências."""
    response = client.get("/api/recorrencias")
    data = response.json()
    assert len(data) > 0
    item = data[0]
    assert "id" in item and isinstance(item["id"], int)
    assert "beneficiario" in item and isinstance(item["beneficiario"], str)
    assert "valor" in item and isinstance(item["valor"], float)
    assert "status" in item and isinstance(item["status"], str)

def test_get_recorrencias_status_validos():
    """NAI-59: Testa se os status retornados estão dentro do domínio permitido."""
    response = client.get("/api/recorrencias")
    data = response.json()
    status_validos = {"ativa", "pausada", "pendente_aprovacao", "cancelada"}
    for item in data:
        assert item["status"] in status_validos

def test_post_approve_recorrencia_existente_retorna_200():
    """NAI-61: Testa se POST /api/recorrencias/{id}/approve retorna sucesso para um ID válido."""
    response = client.post("/api/recorrencias/1/approve")
    assert response.status_code == 200 # ou 204 No Content

def test_post_approve_recorrencia_inexistente_retorna_404():
    """NAI-61: Testa se POST .../approve retorna 404 para um ID inválido."""
    response = client.post("/api/recorrencias/999/approve")
    assert response.status_code == 404

def test_get_em_rota_de_acao_retorna_405():
    """NAI-61: Testa se um método GET em uma rota de ação (POST) retorna 405 Method Not Allowed."""
    response = client.get("/api/recorrencias/1/approve")
    assert response.status_code == 405

def test_post_pause_recorrencia_existente_retorna_200():
    """NAI-61: Testa se POST /api/recorrencias/{id}/pause retorna sucesso para um ID válido."""
    response = client.post("/api/recorrencias/2/pause")
    assert response.status_code == 200

def test_post_cancel_recorrencia_existente_retorna_200():
    """NAI-61: Testa se POST /api/recorrencias/{id}/cancel retorna sucesso para um ID válido."""
    response = client.post("/api/recorrencias/4/cancel")
    assert response.status_code == 200

from typing import List, Optional
from .schemas import Recorrencia
from datetime import date, timedelta

# Mock do banco de dados
MOCK_DB: List[Recorrencia] = [
    Recorrencia(id="rec_1", favorecido="Empresa de Streaming SA", documento="XX.XXX.XXX/0001-XX", valorMaximo=45.90, dataFim=date.today() + timedelta(days=365), status="PENDENTE_APROVACAO"),
    Recorrencia(id="rec_2", favorecido="Academia Fitness Ltda", documento="XX.XXX.XXX/0001-XX", valorMaximo=129.90, dataFim=date.today() + timedelta(days=180), status="ATIVO"),
    Recorrencia(id="rec_3", favorecido="Curso de Idiomas Online", documento="XX.XXX.XXX/0001-XX", valorMaximo=250.00, dataFim=date.today() + timedelta(days=730), status="PAUSADO"),
]

def get_recorrencias_mock() -> List[Recorrencia]:
    return MOCK_DB

def update_status_mock(recorrencia_id: str, new_status: str) -> bool:
    for rec in MOCK_DB:
        if rec.id == recorrencia_id:
            rec.status = new_status
            return True
    return False

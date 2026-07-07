import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecorrenciasService } from './recorrencias.service';
import { Recorrencia } from '../models/recorrencia.model'; // A interface/modelo precisará ser criada

// Mock de dados esperado pela interface Recorrencia
const mockRecorrencias: Recorrencia[] = [
  { id: 1, beneficiario: 'Empresa A', valor: 100.0, status: 'ativa' },
  { id: 2, beneficiario: 'Empresa B', valor: 50.5, status: 'pausada' },
];

describe('RecorrenciasService', () => {
  let service: RecorrenciasService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:8000/api'; // Conforme detectado na stack

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecorrenciasService],
    });
    service = TestBed.inject(RecorrenciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Garante que não há requisições pendentes
  });

  it('NAI-58: deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('NAI-58: getRecorrencias() deve fazer um GET para /api/recorrencias e retornar dados', () => {
    service.getRecorrencias().subscribe(data => {
      expect(data.length).toBe(2);
      expect(data).toEqual(mockRecorrencias);
    });

    const req = httpMock.expectOne(`${apiUrl}/recorrencias`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecorrencias);
  });

  it('NAI-58: getRecorrencias() deve propagar erros HTTP', () => {
    const errorMessage = 'Erro no servidor';
    service.getRecorrencias().subscribe({
      next: () => fail('Deveria ter falhado com o erro 500'),
      error: (error) => {
        expect(error.status).toBe(500);
        expect(error.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(`${apiUrl}/recorrencias`);
    req.flush(errorMessage, { status: 500, statusText: 'Internal Server Error' });
  });

  it('NAI-61: aprovarRecorrencia(id) deve fazer um POST para /api/recorrencias/{id}/approve', () => {
    const id = 1;
    service.aprovarRecorrencia(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/recorrencias/${id}/approve`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({}); // Assegura que o corpo está vazio
    req.flush({ success: true }); // Resposta esperada é um corpo vazio ou de sucesso
  });

  it('NAI-61: pausarRecorrencia(id) deve fazer um POST para /api/recorrencias/{id}/pause', () => {
    const id = 2;
    service.pausarRecorrencia(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/recorrencias/${id}/pause`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ success: true });
  });

  it('NAI-61: cancelarRecorrencia(id) deve fazer um POST para /api/recorrencias/{id}/cancel', () => {
    const id = 3;
    service.cancelarRecorrencia(id).subscribe();

    const req = httpMock.expectOne(`${apiUrl}/recorrencias/${id}/cancel`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({});
    req.flush({ success: true });
  });
});

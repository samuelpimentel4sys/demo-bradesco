import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RecorrenciasService } from './recorrencias.service';
import { Recorrencia } from '../models/recorrencia.model';
import { environment } from '../../environments/environment';

describe('RecorrenciasService', () => {
  let service: RecorrenciasService;
  let httpMock: HttpTestingController;
  const apiUrl = `${environment.apiUrl}/recorrencias`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecorrenciasService]
    });
    service = TestBed.inject(RecorrenciasService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Teste para US-58-T1
  it('should fetch recorrências from the API via GET', () => {
    const mockRecorrencias: Recorrencia[] = [
      { id: '1', favorecido: 'Teste', documento: '123', valorMaximo: 100, dataFim: '2025-01-01', status: 'ATIVO' }
    ];

    service.getRecorrencias().subscribe(recorrencias => {
      expect(recorrencias.length).toBe(1);
      expect(recorrencias).toEqual(mockRecorrencias);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecorrencias);
  });

  // Teste para US-61-T1
  it('should send a POST request to approve a recorrência', () => {
    const id = 'rec_1';
    service.approve(id).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/${id}/approve`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  // Teste para US-61-T2
  it('should send a POST request to pause a recorrência', () => {
    const id = 'rec_2';
    service.pause(id).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/${id}/pause`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });

  // Teste para US-61-T3
  it('should send a POST request to cancel a recorrência', () => {
    const id = 'rec_3';
    service.cancel(id).subscribe();
    const req = httpMock.expectOne(`${apiUrl}/${id}/cancel`);
    expect(req.request.method).toBe('POST');
    req.flush(null, { status: 204, statusText: 'No Content' });
  });
});

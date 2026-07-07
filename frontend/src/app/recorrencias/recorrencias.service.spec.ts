
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { RecorrenciasService } from './recorrencias.service';
import { Recorrencia } from '../core/models/recorrencia.model';
import { HttpErrorResponse } from '@angular/common/http';

describe('RecorrenciasService', () => {
  let service: RecorrenciasService;
  let httpTestingController: HttpTestingController;
  const apiUrl = '/api/recorrencias';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RecorrenciasService],
    });
    service = TestBed.inject(RecorrenciasService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // --- Testes para NAI-58 ---
  describe('getRecorrencias', () => {
    it('TC-58-01: should make a GET request to /api/recorrencias', () => {
      service.getRecorrencias().subscribe();

      const req = httpTestingController.expectOne(apiUrl);
      expect(req.request.method).toEqual('GET');
      req.flush([]);
    });

    it('TC-58-02: should return a list of recorrencias on success', () => {
      const mockRecorrencias: Recorrencia[] = [
        { id: 1, beneficiario: 'Test', valor: 100, status: 'ativa' }
      ];

      service.getRecorrencias().subscribe(data => {
        expect(data).toEqual(mockRecorrencias);
      });

      const req = httpTestingController.expectOne(apiUrl);
      req.flush(mockRecorrencias);
    });

    it('TC-58-03: should propagate HTTP errors', () => {
      const mockError = new ProgressEvent('error');

      service.getRecorrencias().subscribe({
        error: (err: HttpErrorResponse) => {
          expect(err.error).toBe(mockError);
        }
      });

      const req = httpTestingController.expectOne(apiUrl);
      req.error(mockError);
    });
  });

  // --- Testes para NAI-61 ---
  describe('Ações de Recorrência', () => {
    const recorrenciaId = 1;

    it('TC-61-06: aprovarRecorrencia should make a POST to .../approve', () => {
      service.aprovarRecorrencia(recorrenciaId).subscribe();
      const req = httpTestingController.expectOne(`${apiUrl}/${recorrenciaId}/approve`);
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
    });

    it('TC-61-07: pausarRecorrencia should make a POST to .../pause', () => {
      service.pausarRecorrencia(recorrenciaId).subscribe();
      const req = httpTestingController.expectOne(`${apiUrl}/${recorrenciaId}/pause`);
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
    });

    it('TC-61-08: cancelarRecorrencia should make a POST to .../cancel', () => {
      service.cancelarRecorrencia(recorrenciaId).subscribe();
      const req = httpTestingController.expectOne(`${apiUrl}/${recorrenciaId}/cancel`);
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
    });
  });

});

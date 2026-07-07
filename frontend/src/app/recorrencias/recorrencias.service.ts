
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Recorrencia } from '../core/models/recorrencia.model';

@Injectable({
  providedIn: 'root'
})
export class RecorrenciasService {
  private http = inject(HttpClient);
  private apiUrl = '/api/recorrencias'; // URL do proxy configurado no angular.json

  getRecorrencias(): Observable<Recorrencia[]> {
    return this.http.get<Recorrencia[]>(this.apiUrl);
  }

  aprovarRecorrencia(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/approve`, {});
  }

  pausarRecorrencia(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/pause`, {});
  }

  cancelarRecorrencia(id: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/cancel`, {});
  }
}

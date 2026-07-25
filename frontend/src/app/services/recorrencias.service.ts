import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Recorrencia } from '../models/recorrencia.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecorrenciasService {

  private apiUrl = `${environment.apiUrl}/recorrencias`;

  constructor(private http: HttpClient) { }

  getRecorrencias(): Observable<Recorrencia[]> {
    return this.http.get<Recorrencia[]>(this.apiUrl);
  }

  approve(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/approve`, {});
  }

  pause(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/pause`, {});
  }

  cancel(id: string): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/${id}/cancel`, {});
  }
}

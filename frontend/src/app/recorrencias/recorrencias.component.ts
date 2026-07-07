import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecorrenciasService } from '../services/recorrencias.service';
import { Recorrencia } from '../models/recorrencia.model';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-recorrencias',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recorrencias.component.html',
  styleUrls: ['./recorrencias.component.css']
})
export class RecorrenciasComponent implements OnInit {

  recorrencias$: Observable<Recorrencia[]>;
  error: any = null;

  constructor(private recorrenciasService: RecorrenciasService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadRecorrencias();
  }

  loadRecorrencias(): void {
    this.recorrencias$ = this.recorrenciasService.getRecorrencias().pipe(
      catchError(err => {
        this.error = err;
        // No caso de erro, retorna um observable com array vazio para o pipe async não quebrar
        return of([]);
      })
    );
  }

  handleAction(action: 'approve' | 'pause' | 'cancel', id: string): void {
    let actionObservable: Observable<void>;

    switch (action) {
      case 'approve':
        actionObservable = this.recorrenciasService.approve(id);
        break;
      case 'pause':
        actionObservable = this.recorrenciasService.pause(id);
        break;
      case 'cancel':
        actionObservable = this.recorrenciasService.cancel(id);
        break;
    }

    actionObservable.subscribe({
      next: () => {
        // Recarrega a lista para refletir a mudança de status
        this.loadRecorrencias();
        // Força detecção de mudanças se necessário
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = err;
        console.error(`Erro ao ${action} recorrência ${id}`, err);
      }
    });
  }
}


import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { RecorrenciasService } from './recorrencias.service';
import { Recorrencia } from '../core/models/recorrencia.model';
import { finalize } from 'rxjs';
import { CommonModule, CurrencyPipe } from '@angular/common';

// Estado para a view
interface RecorrenciasState {
  recorrencias: Recorrencia[];
  status: 'loading' | 'success' | 'error';
  error: string | null;
}

@Component({
  selector: 'app-recorrencias',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="container">
      <h2>Central de Recorrências (Pix Automático)</h2>

      @switch (state().status) {
        @case ('loading') {
          <div class="spinner">Carregando...</div>
        }
        @case ('success') {
          @if (state().recorrencias.length > 0) {
            <div class="recorrencias-list">
              @for (item of state().recorrencias; track item.id) {
                <div class="card">
                  <div class="card-header">
                    <h3>{{ item.beneficiario }}</h3>
                    <span class="status" [ngClass]="'status-' + item.status">
                      {{ formatStatus(item.status) }}
                    </span>
                  </div>
                  <div class="card-body">
                    <p class="valor">{{ item.valor | currency:'BRL' }}</p>
                  </div>
                  <div class="card-actions">
                    @if (item.status === 'pendente_aprovacao') {
                      <button class="approve-btn" (click)="onAprovar(item.id)">Aprovar</button>
                    }
                    @if (item.status === 'ativa') {
                      <button class="pause-btn" (click)="onPausar(item.id)">Pausar</button>
                    }
                     <button class="cancel-btn" (click)="onCancelar(item.id)">Cancelar</button>
                  </div>
                </div>
              }
            </div>
          } @else {
            <div class="empty-state">
              <p>Nenhuma autorização encontrada.</p>
            </div>
          }
        }
        @case ('error') {
          <div class="error-message">
            <p>{{ state().error }}</p>
            <button (click)="loadRecorrencias()">Tentar Novamente</button>
          </div>
        }
      }
    </div>
  `,
  styleUrl: './recorrencias.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RecorrenciasComponent implements OnInit {
  private recorrenciasService = inject(RecorrenciasService);

  // TC-58-07: Componente usa signals
  state = signal<RecorrenciasState>({
    recorrencias: [],
    status: 'loading',
    error: null,
  });

  ngOnInit(): void {
    this.loadRecorrencias();
  }

  loadRecorrencias(): void {
    this.state.update(s => ({ ...s, status: 'loading' }));
    this.recorrenciasService.getRecorrencias()
      .pipe(finalize(() => {}))
      .subscribe({
        next: (data) => this.state.set({ recorrencias: data, status: 'success', error: null }),
        error: () => this.state.set({ recorrencias: [], status: 'error', error: 'Não foi possível carregar os dados.' }),
      });
  }

  onAprovar(id: number): void {
    this.handleAction(this.recorrenciasService.aprovarRecorrencia(id));
  }
  
  onPausar(id: number): void {
    this.handleAction(this.recorrenciasService.pausarRecorrencia(id));
  }

  onCancelar(id: number): void {
    this.handleAction(this.recorrenciasService.cancelarRecorrencia(id));
  }

  private handleAction(action$: any) {
    action$.subscribe({
      next: () => this.loadRecorrencias(), // TC-61-13: Refresh pós-ação
      error: () => alert('Falha ao executar a ação. Tente novamente.') // TC-61-12
    });
  }

  formatStatus(status: Recorrencia['status']): string {
    const map: Record<Recorrencia['status'], string> = {
      ativa: 'Ativa',
      pausada: 'Pausada',
      pendente_aprovacao: 'Pendente'
    };
    return map[status];
  }
}

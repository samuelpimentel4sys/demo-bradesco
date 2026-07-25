import { Injectable, inject, signal, computed } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, of, delay } from 'rxjs';
import { Debito, SimulacaoRequest, SimulacaoResponse, PaymentType } from './renegociacao.types';

@Injectable({
  providedIn: 'root'
})
export class RenegociacaoService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = 'http://localhost:8080/api/v1/negotiations';

  // Signals para gerenciamento de estado reativo
  public readonly currentCpf = signal<string | null>(null);
  public readonly isOtpSent = signal<boolean>(false);
  public readonly isAutenticado = signal<boolean>(false);
  public readonly currentStep = signal<number>(1); // 1: Login/OTP, 2: Lista Débitos, 3: Simulador/Contrato, 4: Pagamento/Sucesso
  
  // Lista de dívidas ativas para o CPF carregado
  public readonly debitos = signal<Debito[]>([]);
  public readonly selectedDebitoIds = signal<string[]>([]);
  
  // Estado da simulação ativa (retornado do backend Java)
  public readonly activeSimulation = signal<SimulacaoResponse | null>(null);
  public readonly isSimulationLoading = signal<boolean>(false);
  public readonly simulationError = signal<string | null>(null);
  
  // Registra se o pagamento foi confirmado
  public readonly isPagamentoConfirmado = signal<boolean>(false);
  public readonly hashComprovante = signal<string | null>(null);

  // Computeds reativos
  public readonly selectedDebitosTotalOriginal = computed(() => {
    return this.debitos()
      .filter(d => this.selectedDebitoIds().includes(d.id))
      .reduce((sum, d) => sum + d.originalValue, 0);
  });

  public readonly selectedDebitosTotalAtualizado = computed(() => {
    return this.debitos()
      .filter(d => this.selectedDebitoIds().includes(d.id))
      .reduce((sum, d) => sum + d.updatedValue, 0);
  });

  /**
   * Envia o CPF para gerar e disparar o código OTP (MOCK para a POC)
   */
  enviarOtp(cpf: string): Observable<boolean> {
    this.currentCpf.set(cpf);
    // Simula atraso de rede e salva o estado de OTP enviado
    return of(true).pipe(
      delay(800),
      tap(() => {
        this.isOtpSent.set(true);
        // Gera dívidas de teste realistas para o CPF
        this.carregarDebitosMock(cpf);
      })
    );
  }

  /**
   * Valida o código OTP e autentica o usuário (MOCK para a POC)
   */
  validarOtp(codigo: string): Observable<boolean> {
    return of(codigo === '123456' || codigo.length === 6).pipe(
      delay(800),
      tap(valido => {
        if (valido) {
          this.isAutenticado.set(true);
          this.currentStep.set(2); // Avança para o Dashboard de Débitos
        }
      })
    );
  }

  /**
   * Carrega dívidas de teste baseadas no CPF inserido
   */
  private carregarDebitosMock(cpf: string): void {
    const list: Debito[] = [
      {
        id: 'DEB-001',
        creditorName: 'Banco Bradesco S.A.',
        contractNumber: 'CTR-45129-X',
        originalValue: 1250.00,
        updatedValue: 1480.50,
        daysPastDue: 345,
        status: 'ACTIVE'
      },
      {
        id: 'DEB-002',
        creditorName: 'Bradescard Visa',
        contractNumber: 'CTR-99823-A',
        originalValue: 450.00,
        updatedValue: 520.10,
        daysPastDue: 180,
        status: 'ACTIVE'
      },
      {
        id: 'DEB-003',
        creditorName: 'Claro Telecom',
        contractNumber: 'CTR-00122-B',
        originalValue: 150.00,
        updatedValue: 150.00,
        daysPastDue: 45,
        status: 'ACTIVE'
      }
    ];
    this.debitos.set(list);
    // Seleciona todas por padrão para incentivar a quitação completa
    this.selectedDebitoIds.set(list.map(d => d.id));
  }

  /**
   * Toggle de seleção de débito na lista
   */
  toggleDebitoSelecao(id: string): void {
    const ids = this.selectedDebitoIds();
    if (ids.includes(id)) {
      this.selectedDebitoIds.set(ids.filter(x => x !== id));
    } else {
      this.selectedDebitoIds.set([...ids, id]);
    }
  }

  /**
   * Dispara a simulação de acordo consumindo a API real Java Spring Boot
   */
  simularAcordo(numeroParcelas: number): void {
    const cpf = this.currentCpf();
    const debitosIds = this.selectedDebitoIds();
    
    if (!cpf || debitosIds.length === 0) {
      this.simulationError.set('Nenhum débito selecionado ou CPF ausente.');
      return;
    }

    this.isSimulationLoading.set(true);
    this.simulationError.set(null);

    const payload: SimulacaoRequest = {
      cpf: cpf.replace(/\D/g, ''), // Sanitiza CPF antes de enviar ao Java
      debitosIds: debitosIds,
      numeroParcelas: numeroParcelas
    };

    this.http.post<SimulacaoResponse>(`${this.apiUrl}/simulate`, payload).subscribe({
      next: (response) => {
        this.activeSimulation.set(response);
        this.isSimulationLoading.set(false);
      },
      error: (err) => {
        this.isSimulationLoading.set(false);
        if (err.status === 422) {
          this.simulationError.set(err.error?.message || 'Erro de validação de regra de negócio (parcela mínima de R$ 50,00).');
        } else {
          this.simulationError.set('Erro ao conectar com o motor de cálculo Java. Verifique se o backend está rodando na porta 8080.');
        }
      }
    });
  }

  /**
   * Confirma os termos do acordo
   */
  confirmarAcordo(): void {
    this.currentStep.set(4); // Avança para a tela de pagamento
  }

  /**
   * Simula a confirmação de recebimento do Pix pelo Webhook (mecanismo de demonstração da POC)
   */
  simularWebhookPagamento(): Observable<boolean> {
    return of(true).pipe(
      delay(1500),
      tap(() => {
        this.isPagamentoConfirmado.set(true);
        this.hashComprovante.set('SHA256-' + Math.random().toString(36).substring(2, 15).toUpperCase());
        // Altera o status das dívidas para liquidadas
        this.debitos.set(this.debitos().map(d => ({ ...d, status: 'SETTLED' })));
      })
    );
  }

  /**
   * Reinicia o fluxo do portal do início
   */
  resetFluxo(): void {
    this.currentCpf.set(null);
    this.isOtpSent.set(false);
    this.isAutenticado.set(false);
    this.currentStep.set(1);
    this.debitos.set([]);
    this.selectedDebitoIds.set([]);
    this.activeSimulation.set(null);
    this.isSimulationLoading.set(false);
    this.simulationError.set(null);
    this.isPagamentoConfirmado.set(false);
    this.hashComprovante.set(null);
  }
}

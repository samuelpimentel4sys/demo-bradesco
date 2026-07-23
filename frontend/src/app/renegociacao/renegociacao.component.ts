import { Component, inject, signal, effect, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RenegociacaoService } from './renegociacao.service';
import { PaymentType } from './renegociacao.types';

@Component({
  selector: 'app-renegociacao',
  standalone: true,
  imports: [CommonModule, FormsModule],
  providers: [DecimalPipe],
  templateUrl: './renegociacao.component.html',
  styleUrl: './renegociacao.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RenegociacaoComponent {
  protected readonly renegService = inject(RenegociacaoService);

  // Exposição reativa de Signals do Serviço para o Template
  protected readonly step = this.renegService.currentStep;
  protected readonly cpf = this.renegService.currentCpf;
  protected readonly isOtpSent = this.renegService.isOtpSent;
  protected readonly debitos = this.renegService.debitos;
  protected readonly selectedDebitoIds = this.renegService.selectedDebitoIds;
  protected readonly simResponse = this.renegService.activeSimulation;
  protected readonly isSimLoading = this.renegService.isSimulationLoading;
  protected readonly simError = this.renegService.simulationError;
  protected readonly isConfirmado = this.renegService.isPagamentoConfirmado;
  protected readonly hashComprovante = this.renegService.hashComprovante;

  // Estados locais do Componente
  protected readonly isSending = signal<boolean>(false);
  protected readonly timer = signal<number>(180); // 180s = 3min de TTL (RL-AUTH-02)
  protected readonly timerIntervalId = signal<any>(null);
  
  protected readonly tipoPagamento = signal<PaymentType>(PaymentType.A_VISTA);
  protected readonly parcelas = signal<number>(1);
  
  protected readonly hasReadTerms = signal<boolean>(false);
  protected termsAccepted: boolean = false;
  
  protected otpCode: string = '';
  protected readonly pixCode = '00020101021226870014BR.GOV.BCB.PIX2565pix-dinamico.foursys.com.br/reneg/v1/cob23985203523053039865802BR5925BUREAU DE CREDITO SA6009SAO PAULO62070503***6304D1B4';
  protected readonly copySuccess = signal<boolean>(false);
  protected readonly isSimulatingWebhook = signal<boolean>(false);

  public readonly dataComprovante = new Date().toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  constructor() {
    // Reage dinamicamente a mudanças de seleção para rodar o motor de cálculo do backend Java
    effect(() => {
      const stepValue = this.step();
      const pCount = this.parcelas();
      const pType = this.tipoPagamento();
      
      if (stepValue === 3) {
        // Dispara recálculo no backend Java sempre que as dependências reativas mudarem
        const finalInstallments = pType === PaymentType.A_VISTA ? 1 : pCount;
        this.renegService.simularAcordo(finalInstallments);
      }
    }, { allowSignalWrites: true });
  }

  /**
   * Formata e insere máscara dinâmica de CPF em tempo de digitação
   */
  onCpfInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    let value = input.value.replace(/\D/g, ''); // Remove não-dígitos
    
    if (value.length > 11) {
      value = value.substring(0, 11);
    }

    // Aplica máscara 000.000.000-00
    if (value.length > 9) {
      value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6, 9)}-${value.substring(9)}`;
    } else if (value.length > 6) {
      value = `${value.substring(0, 3)}.${value.substring(3, 6)}.${value.substring(6)}`;
    } else if (value.length > 3) {
      value = `${value.substring(0, 3)}.${value.substring(3)}`;
    }

    this.renegService.currentCpf.set(value);
  }

  /**
   * Solicita o envio de OTP de acesso
   */
  solicitarOtp(): void {
    const currentCpfVal = this.cpf();
    if (!currentCpfVal || currentCpfVal.replace(/\D/g, '').length < 11) return;

    this.isSending.set(true);
    this.renegService.enviarOtp(currentCpfVal).subscribe(() => {
      this.isSending.set(false);
      this.iniciarContagemRegressiva();
    });
  }

  /**
   * Controla a contagem regressiva de expiração do OTP (180 segundos)
   */
  private iniciarContagemRegressiva(): void {
    this.timer.set(180);
    if (this.timerIntervalId()) {
      clearInterval(this.timerIntervalId());
    }

    const interval = setInterval(() => {
      const currentTimer = this.timer();
      if (currentTimer <= 1) {
        clearInterval(interval);
        this.renegService.isOtpSent.set(false); // Força reenvio
        this.otpCode = '';
      } else {
        this.timer.set(currentTimer - 1);
      }
    }, 1000);

    this.timerIntervalId.set(interval);
  }

  /**
   * Valida o OTP e autentica o devedor
   */
  confirmarOtp(): void {
    if (this.otpCode.length < 6) return;
    
    this.isSending.set(true);
    this.renegService.validarOtp(this.otpCode).subscribe(valido => {
      this.isSending.set(false);
      if (valido && this.timerIntervalId()) {
        clearInterval(this.timerIntervalId());
      }
    });
  }

  /**
   * Retorna para digitação do CPF
   */
  voltarParaCpf(): void {
    if (this.timerIntervalId()) {
      clearInterval(this.timerIntervalId());
    }
    this.renegService.isOtpSent.set(false);
    this.otpCode = '';
  }

  /**
   * Métodos auxiliares de formatação de strings
   */
  formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }

  formatCpf(cpfVal: string | null): string {
    return cpfVal || '';
  }

  /**
   * Operações do grid de dívidas (Step 2)
   */
  isSelected(id: string): boolean {
    return this.selectedDebitoIds().includes(id);
  }

  toggleSelecao(id: string): void {
    this.renegService.toggleDebitoSelecao(id);
  }

  isAllSelected(): boolean {
    return this.selectedDebitoIds().length === this.debitos().length;
  }

  toggleSelectAll(): void {
    if (this.isAllSelected()) {
      this.renegService.selectedDebitoIds.set([]);
    } else {
      this.renegService.selectedDebitoIds.set(this.debitos().map(d => d.id));
    }
  }

  selectedIdsCount(): number {
    return this.selectedDebitoIds().length;
  }

  totalOriginal(): number {
    return this.renegService.selectedDebitosTotalOriginal();
  }

  totalAtualizado(): number {
    return this.renegService.selectedDebitosTotalAtualizado();
  }

  prosseguirParaSimulador(): void {
    this.renegService.currentStep.set(3);
  }

  /**
   * Configurações de simulação reativa (Step 3)
   */
  setTipoPagamento(type: 'A_VISTA' | 'PARCELADO'): void {
    this.tipoPagamento.set(type as PaymentType);
    this.termsAccepted = false;
    this.hasReadTerms.set(false);
    
    if (type === 'A_VISTA') {
      this.parcelas.set(1);
    } else {
      this.parcelas.set(6); // default de parcelas
    }
  }

  onParcelasChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.parcelas.set(parseInt(input.value, 10));
    this.termsAccepted = false;
  }

  voltarParaDebitos(): void {
    this.renegService.currentStep.set(2);
    this.termsAccepted = false;
    this.hasReadTerms.set(false);
  }

  /**
   * Garante a leitura total da minuta para destravar o checkbox (UX Heuristics)
   */
  onTermsScroll(event: Event): void {
    const element = event.target as HTMLElement;
    const scrollPercent = (element.scrollTop + element.clientHeight) / element.scrollHeight;
    
    // Libera o checkbox quando o usuário rolar 90% do contrato
    if (scrollPercent >= 0.9) {
      this.hasReadTerms.set(true);
    }
  }

  confirmarAcordo(): void {
    if (!this.termsAccepted) return;
    this.renegService.confirmarAcordo();
  }

  /**
   * Operações de checkout e quitação (Step 4)
   */
  copiarPix(): void {
    navigator.clipboard.writeText(this.pixCode).then(() => {
      this.copySuccess.set(true);
      setTimeout(() => this.copySuccess.set(false), 2000);
    });
  }

  dispararWebhook(): void {
    this.isSimulatingWebhook.set(true);
    this.renegService.simularWebhookPagamento().subscribe(() => {
      this.isSimulatingWebhook.set(false);
    });
  }

  imprimirRecibo(): void {
    window.print();
  }

  finalizarEVoltar(): void {
    this.renegService.resetFluxo();
  }

  logout(): void {
    this.renegService.resetFluxo();
  }
}

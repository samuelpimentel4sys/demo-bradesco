import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DecimalPipe } from '@angular/common';
import { of, throwError } from 'rxjs';
import { RenegociacaoComponent } from './renegociacao.component';
import { RenegociacaoService } from './renegociacao.service';
import { PaymentType } from './renegociacao.types';

describe('RenegociacaoComponent', () => {
  let component: RenegociacaoComponent;
  let fixture: ComponentFixture<RenegociacaoComponent>;
  let service: RenegociacaoService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenegociacaoComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        DecimalPipe,
        RenegociacaoService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RenegociacaoComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RenegociacaoService);
    fixture.detectChanges();
  });

  it('deve inicializar com o passo 1 (Login OTP)', () => {
    expect(component).toBeTruthy();
    expect(component['step']()).toBe(1);
    expect(component['isOtpSent']()).toBe(false);
  });

  it('deve formatar o CPF corretamente com mascara em tempo real', () => {
    const event = {
      target: { value: '12345678901' }
    } as unknown as Event;

    component.onCpfInput(event);
    expect(component['cpf']()).toBe('123.456.789-01');
  });

  it('deve mudar o tipo de pagamento para parcelado e configurar parcelas padrao como 6', () => {
    component['setTipoPagamento']('PARCELADO');
    expect(component['tipoPagamento']()).toBe(PaymentType.PARCELADO);
    expect(component['parcelas']()).toBe(6);
  });

  it('deve desmarcar a aceitacao dos termos quando o numero de parcelas mudar', () => {
    component['termsAccepted'] = true;
    const event = {
      target: { value: '12' }
    } as unknown as Event;

    component.onParcelasChange(event);
    expect(component['parcelas']()).toBe(12);
    expect(component['termsAccepted']).toBe(false);
  });

  it('deve destravar o checkbox de termos quando scroll chegar a 95%', () => {
    expect(component['hasReadTerms']()).toBe(false);

    const event = {
      target: {
        scrollTop: 900,
        clientHeight: 100,
        scrollHeight: 1000
      }
    } as unknown as Event;

    component.onTermsScroll(event);
    expect(component['hasReadTerms']()).toBe(true);
  });

  it('deve disparar webhook e concluir o pagamento atualizando as dividas para liquidadas', fakeAsync(() => {
    component['renegService'].currentStep.set(4);
    component['renegService'].currentCpf.set('123.456.789-01');
    
    // Inicia faturas de teste
    component['renegService'].enviarOtp('123.456.789-01').subscribe();
    tick(800);
    fixture.detectChanges();

    expect(component['debitos']()[0].status).toBe('ACTIVE');

    // Executa webhook de teste
    component.dispararWebhook();
    expect(component['isSimulatingWebhook']()).toBe(true);
    
    tick(1500); // Aguarda o delay do mock do webhook no service
    fixture.detectChanges();

    expect(component['isSimulatingWebhook']()).toBe(false);
    expect(component['isConfirmado']()).toBe(true);
    expect(component['debitos']()[0].status).toBe('SETTLED');
  }));
});

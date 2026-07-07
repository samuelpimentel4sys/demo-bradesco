
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

import { RecorrenciasComponent } from './recorrencias.component';
import { RecorrenciasService } from './recorrencias.service';
import { Recorrencia } from '../core/models/recorrencia.model';
import { ChangeDetectionStrategy } from '@angular/core';

const MOCK_RECORRENCIAS: Recorrencia[] = [
  { id: 1, beneficiario: 'Netflix', valor: 39.9, status: 'ativa' },
  { id: 2, beneficiario: 'Spotify', valor: 21.9, status: 'pausada' },
  { id: 3, beneficiario: 'Amazon', valor: 14.9, status: 'pendente_aprovacao' },
];

describe('RecorrenciasComponent', () => {
  let component: RecorrenciasComponent;
  let fixture: ComponentFixture<RecorrenciasComponent>;
  let recorrenciasService: jasmine.SpyObj<RecorrenciasService>;

  beforeEach(async () => {
    // Criar um spy object para o serviço
    const spy = jasmine.createSpyObj('RecorrenciasService', [
      'getRecorrencias', 'aprovarRecorrencia', 'pausarRecorrencia', 'cancelarRecorrencia'
    ]);

    await TestBed.configureTestingModule({
      imports: [RecorrenciasComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: RecorrenciasService, useValue: spy }
      ],
    })
    // TC-58-07: Forçar OnPush para garantir que o padrão está sendo seguido
    .overrideComponent(RecorrenciasComponent, {
      set: { changeDetection: ChangeDetectionStrategy.OnPush }
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecorrenciasComponent);
    component = fixture.componentInstance;
    recorrenciasService = TestBed.inject(RecorrenciasService) as jasmine.SpyObj<RecorrenciasService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // --- Testes para NAI-58: Estado do componente ---
  describe('Component State Management', () => {
    it('TC-58-04: should start in loading state and show spinner', () => {
      recorrenciasService.getRecorrencias.and.returnValue(of(MOCK_RECORRENCIAS).pipe());
      fixture.detectChanges(); // ngOnInit

      const spinner = fixture.nativeElement.querySelector('.spinner');
      expect(component.state().status).toBe('loading');
      expect(spinner).toBeTruthy();
    });

    it('TC-58-05: should transition to success state, hide spinner and render content', fakeAsync(() => {
      recorrenciasService.getRecorrencias.and.returnValue(of(MOCK_RECORRENCIAS));
      fixture.detectChanges(); // ngOnInit
      tick(); // Simula passagem de tempo para o `of()` resolver
      fixture.detectChanges(); // Re-render após o estado mudar

      expect(component.state().status).toBe('success');
      expect(component.state().recorrencias).toEqual(MOCK_RECORRENCIAS);
      const spinner = fixture.nativeElement.querySelector('.spinner');
      const content = fixture.nativeElement.querySelector('.recorrencias-list');
      expect(spinner).toBeFalsy();
      expect(content).toBeTruthy();
    }));

    it('TC-58-06: should transition to error state and show error message', fakeAsync(() => {
      recorrenciasService.getRecorrencias.and.returnValue(throwError(() => new Error('HTTP Error')));
      fixture.detectChanges(); // ngOnInit
      tick();
      fixture.detectChanges();

      expect(component.state().status).toBe('error');
      expect(component.state().error).toBe('Não foi possível carregar os dados.');
      const errorMessage = fixture.nativeElement.querySelector('.error-message');
      const spinner = fixture.nativeElement.querySelector('.spinner');
      const content = fixture.nativeElement.querySelector('.recorrencias-list');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toContain('Não foi possível carregar os dados.');
      expect(spinner).toBeFalsy();
      expect(content).toBeFalsy();
    }));
  });

  // --- Testes para NAI-60: Renderização da Lista ---
  describe('List Rendering', () => {
    beforeEach(fakeAsync(() => {
      recorrenciasService.getRecorrencias.and.returnValue(of(MOCK_RECORRENCIAS));
      fixture.detectChanges();
      tick();
      fixture.detectChanges();
    }));

    it('TC-60-01: should render N cards for N items', () => {
      const cards = fixture.nativeElement.querySelectorAll('.card');
      expect(cards.length).toBe(MOCK_RECORRENCIAS.length);
    });

    it('TC-60-02: should display beneficiario, valor and status in a card', () => {
      const card = fixture.nativeElement.querySelector('.card');
      expect(card.textContent).toContain('Netflix');
      expect(card.textContent).toContain('R$ 39,90'); // TC-60-05
      expect(card.textContent).toContain('Ativa');   // TC-60-04
    });

    it('TC-60-03: should display "Nenhuma autorização encontrada" for empty list', fakeAsync(() => {
      recorrenciasService.getRecorrencias.and.returnValue(of([]));
      fixture.detectChanges(); // ngOnInit
      tick();
      fixture.detectChanges();
      
      const emptyMessage = fixture.nativeElement.querySelector('.empty-state');
      const cards = fixture.nativeElement.querySelectorAll('.card');
      expect(emptyMessage.textContent).toContain('Nenhuma autorização encontrada');
      expect(cards.length).toBe(0);
    }));

    it('TC-60-04 & TC-60-05: should format status and currency correctly', () => {
        const cards = fixture.nativeElement.querySelectorAll('.card');
        // Card 1: Ativa
        expect(cards[0].querySelector('.status-ativa').textContent.trim()).toBe('Ativa');
        expect(cards[0].querySelector('.valor').textContent.trim()).toBe('R$ 39,90');
        // Card 2: Pausada
        expect(cards[1].querySelector('.status-pausada').textContent.trim()).toBe('Pausada');
        expect(cards[1].querySelector('.valor').textContent.trim()).toBe('R$ 21,90');
        // Card 3: Pendente
        expect(cards[2].querySelector('.status-pendente_aprovacao').textContent.trim()).toBe('Pendente');
        expect(cards[2].querySelector('.valor').textContent.trim()).toBe('R$ 14,90');
    });
  });

  // --- Testes para NAI-61: Ações nos Cards ---
  describe('Card Actions', () => {
    beforeEach(fakeAsync(() => {
        recorrenciasService.getRecorrencias.and.returnValue(of(MOCK_RECORRENCIAS));
        recorrenciasService.pausarRecorrencia.and.returnValue(of({}));
        recorrenciasService.cancelarRecorrencia.and.returnValue(of({}));
        recorrenciasService.aprovarRecorrencia.and.returnValue(of({}));
        fixture.detectChanges();
        tick();
        fixture.detectChanges();
    }));
  
    it('TC-61-09: should show "Aprovar" button only for "pendente_aprovacao" status', () => {
        const cards = fixture.nativeElement.querySelectorAll('.card');
        const approveBtnActive = cards[0].querySelector('button.approve-btn');
        const approveBtnPending = cards[2].querySelector('button.approve-btn');
        expect(approveBtnActive).toBeFalsy();
        expect(approveBtnPending).toBeTruthy();
    });

    it('TC-61-10: clicking "Pausar" should call the service and reflect new state', fakeAsync(() => {
        const cardAtiva = fixture.nativeElement.querySelectorAll('.card')[0];
        const pauseButton = cardAtiva.querySelector('button.pause-btn');
        pauseButton.click();
        
        expect(recorrenciasService.pausarRecorrencia).toHaveBeenCalledWith(1);
        
        // TC-61-13: Simula o refresh
        const updatedList = MOCK_RECORRENCIAS.map(r => r.id === 1 ? {...r, status: 'pausada'} : r);
        recorrenciasService.getRecorrencias.and.returnValue(of(updatedList));
        component.loadRecorrencias(); // Simula o refresh
        tick();
        fixture.detectChanges();

        const updatedCard = fixture.nativeElement.querySelectorAll('.card')[0];
        expect(updatedCard.querySelector('.status-pausada')).toBeTruthy();
    }));

    it('TC-61-11: clicking "Cancelar" should call the service', () => {
      const cardAtiva = fixture.nativeElement.querySelectorAll('.card')[0];
      const cancelButton = cardAtiva.querySelector('button.cancel-btn');
      cancelButton.click();
      expect(recorrenciasService.cancelarRecorrencia).toHaveBeenCalledWith(1);
    });

    it('TC-61-12: should show an error message on action failure and preserve card state', fakeAsync(() => {
      recorrenciasService.pausarRecorrencia.and.returnValue(throwError(() => new Error('API Error')));
      spyOn(window, 'alert'); // Para não abrir um alert real durante o teste

      const cardAtiva = fixture.nativeElement.querySelectorAll('.card')[0];
      const pauseButton = cardAtiva.querySelector('button.pause-btn');
      pauseButton.click();
      tick();
      fixture.detectChanges();

      expect(recorrenciasService.pausarRecorrencia).toHaveBeenCalledWith(1);
      expect(window.alert).toHaveBeenCalledWith('Falha ao executar a ação. Tente novamente.'); // Ou um toast, snackbar, etc.
      
      // Verifica que o estado não mudou na UI
      const cardAfterError = fixture.nativeElement.querySelectorAll('.card')[0];
      expect(cardAfterError.querySelector('.status-ativa')).toBeTruthy();
    }));
  });

});

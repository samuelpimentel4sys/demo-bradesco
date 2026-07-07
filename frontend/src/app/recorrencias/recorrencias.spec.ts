import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecorrenciasComponent } from './recorrencias.component';
import { RecorrenciasService } from '../services/recorrencias.service';
import { ChangeDetectorRef } from '@angular/core';
import { Recorrencia } from '../models/recorrencia.model';
import { vi } from 'vitest';

// Mock de dados
const mockRecorrencias: Recorrencia[] = [
  { id: 1, beneficiario: 'Teste 1', valor: 10, status: 'ativa' },
  { id: 2, beneficiario: 'Teste 2', valor: 20, status: 'pendente_aprovacao' },
];

// Mock do serviço com spies do Vitest
const mockRecorrenciasService = {
  getRecorrencias: vi.fn(),
  aprovarRecorrencia: vi.fn(() => of({ success: true })),
  pausarRecorrencia: vi.fn(() => of({ success: true })),
  cancelarRecorrencia: vi.fn(() => of({ success: true })),
};

describe('RecorrenciasComponent', () => {
  let component: RecorrenciasComponent;
  let fixture: ComponentFixture<RecorrenciasComponent>;
  let service: RecorrenciasService;

  beforeEach(async () => {
    // Reset mocks before each test
    vi.resetAllMocks();

    await TestBed.configureTestingModule({
      imports: [RecorrenciasComponent], // Componente standalone
      providers: [
        { provide: RecorrenciasService, useValue: mockRecorrenciasService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RecorrenciasComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecorrenciasService);
  });

  it('NAI-58: deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('NAI-58: deve estar no estado de loading ao iniciar e chamar getRecorrencias', () => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of([]));
    
    // O estado inicial já deve ser loading
    expect(component.state().loading).toBe(true);

    fixture.detectChanges(); // Dispara ngOnInit
    
    expect(service.getRecorrencias).toHaveBeenCalled();
  });

  it('NAI-58 & NAI-60: deve ir para o estado de sucesso e renderizar os cards', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of(mockRecorrencias));
    fixture.detectChanges(); // ngOnInit
    tick(); // Resolve a promise do observable
    fixture.detectChanges();

    expect(component.state().loading).toBe(false);
    expect(component.state().data).toEqual(mockRecorrencias);
    expect(component.state().error).toBeNull();
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('.card-recorrencia').length).toBe(2);
    expect(compiled.querySelector('.mensagem-vazio')).toBeNull();
  }));

  it('NAI-60: deve exibir mensagem quando a lista estiver vazia', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of([]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.state().data?.length).toBe(0);
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mensagem-vazio')?.textContent).toContain('Nenhuma autorização encontrada');
    expect(compiled.querySelectorAll('.card-recorrencia').length).toBe(0);
  }));
  
  it('NAI-58: deve ir para o estado de erro se o serviço falhar', fakeAsync(() => {
    const errorResponse = { message: 'Erro de API' };
    mockRecorrenciasService.getRecorrencias.mockReturnValue(throwError(() => errorResponse));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    expect(component.state().loading).toBe(false);
    expect(component.state().error).toEqual(errorResponse);
    
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.mensagem-erro')?.textContent).toContain('Ocorreu um erro ao buscar os dados.');
  }));
  
  it('NAI-61: deve chamar aprovarRecorrencia do serviço', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of(mockRecorrencias));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    component.handleAprovar(1);
    expect(service.aprovarRecorrencia).toHaveBeenCalledWith(1);
  }));

  it('NAI-61: deve chamar pausarRecorrencia do serviço', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of(mockRecorrencias));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    component.handlePausar(1);
    expect(service.pausarRecorrencia).toHaveBeenCalledWith(1); 
  }));

  it('NAI-61: deve chamar cancelarRecorrencia do serviço', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.mockReturnValue(of(mockRecorrencias));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    
    component.handleCancelar(1);
    expect(service.cancelarRecorrencia).toHaveBeenCalledWith(1);
  }));
});

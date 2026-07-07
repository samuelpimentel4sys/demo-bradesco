import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of, throwError } from 'rxjs';
import { RecorrenciasComponent } from './recorrencias.component';
import { RecorrenciasService } from '../services/recorrencias.service';
import { Recorrencia } from '../models/recorrencia.model';
import { ChangeDetectorRef } from '@angular/core';

describe('RecorrenciasComponent', () => {
  let component: RecorrenciasComponent;
  let fixture: ComponentFixture<RecorrenciasComponent>;
  let mockRecorrenciasService: jasmine.SpyObj<RecorrenciasService>;

  const mockRecorrencias: Recorrencia[] = [
    { id: '1', favorecido: 'Empresa A', documento: '111', valorMaximo: 100, dataFim: '2025-12-31', status: 'ATIVO' },
    { id: '2', favorecido: 'Empresa B', documento: '222', valorMaximo: 200, dataFim: '2024-12-31', status: 'PENDENTE_APROVACAO' },
  ];

  beforeEach(async () => {
    mockRecorrenciasService = jasmine.createSpyObj('RecorrenciasService', ['getRecorrencias', 'approve', 'pause', 'cancel']);
    
    await TestBed.configureTestingModule({
      imports: [RecorrenciasComponent], // Componente standalone
      providers: [
        { provide: RecorrenciasService, useValue: mockRecorrenciasService },
        ChangeDetectorRef
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(RecorrenciasComponent);
    component = fixture.componentInstance;
  });

  // Teste para US-58-T2
  it('should display loading state initially and then show data', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.and.returnValue(of(mockRecorrencias));
    fixture.detectChanges(); // ngOnInit
    
    // Antes do tick, o estado deveria ser de "loading"
    let loadingEl = fixture.nativeElement.querySelector('.loading-spinner');
    expect(loadingEl).toBeTruthy();

    tick(); // Resolve o Observable
    fixture.detectChanges();

    // Após o tick, o loading some e os dados aparecem
    loadingEl = fixture.nativeElement.querySelector('.loading-spinner');
    const dataEl = fixture.nativeElement.querySelector('.card-grid');
    expect(loadingEl).toBeFalsy();
    expect(dataEl.children.length).toBe(2);
    expect(fixture.nativeElement.textContent).toContain('Empresa A');
  }));

  // Teste para US-60-T1
  it('should display empty state message when no recorrências are returned', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.and.returnValue(of([]));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const emptyStateEl = fixture.nativeElement.querySelector('.empty-state');
    expect(emptyStateEl).toBeTruthy();
    expect(emptyStateEl.textContent).toContain('Nenhuma autorização de Pix Automático encontrada.');
  }));

  // Teste para US-58-T3
  it('should display error message when the service fails', fakeAsync(() => {
    mockRecorrenciasService.getRecorrencias.and.returnValue(throwError(() => new Error('API Error')));
    fixture.detectChanges();
    tick();
    fixture.detectChanges();

    const errorEl = fixture.nativeElement.querySelector('.alert-danger');
    expect(errorEl).toBeTruthy();
    expect(errorEl.textContent).toContain('Não foi possível carregar as autorizações.');
  }));

  // Teste para NAI-61
  it('should call approve method when approve button is clicked', () => {
    mockRecorrenciasService.getRecorrencias.and.returnValue(of(mockRecorrencias));
    mockRecorrenciasService.approve.and.returnValue(of(undefined));
    fixture.detectChanges();

    component.handleAction('approve', '2');
    
    expect(mockRecorrenciasService.approve).toHaveBeenCalledWith('2');
  });
});

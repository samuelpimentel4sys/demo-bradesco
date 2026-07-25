import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: 'renegociacao',
    loadComponent: () => import('./renegociacao/renegociacao.component').then(m => m.RenegociacaoComponent)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.LoginComponent)
  },
  {
    path: 'dashboard',
    loadComponent: () => import('./dashboard/dashboard').then(m => m.DashboardComponent),
    canActivate: [authGuard]
  },
  {
    path: '',
    redirectTo: 'renegociacao', // Redireciona para o portal de renegociações como padrão
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'renegociacao'
  }
];

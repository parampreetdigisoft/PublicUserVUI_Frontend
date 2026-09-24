import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    canActivate: [authGuard], 
    loadComponent: () =>
      import('./features/dashboard-component/dashboard-component').then(
        (m) => m.DashboardComponent
      )
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth-component/auth-component.route').then((m) => m.AUTH_ROUTES),
  },
  {
    path: '**',
    redirectTo: '',
  },
];

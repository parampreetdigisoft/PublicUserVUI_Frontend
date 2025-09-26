import { Routes } from '@angular/router';
import { authGuard } from './core/guards/authGuard';
import { HomeComponent } from './features/home-component/home-component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [authGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./features/dashboard-component/dashboard-component').then(
            (m) => m.DashboardComponent
          )
      },
    ]
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

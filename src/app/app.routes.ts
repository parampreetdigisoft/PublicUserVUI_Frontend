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
        loadChildren: () =>
          import('./features/dashboard-component/dashboard-component.route').then(
            (m) => m.Dashboard_ROUTES
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

import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () =>import('../app/features/home-component/home-component').then(m => m.HomeComponent),
  },
  {
    path: 'index-methodology',
    loadComponent: () =>import('../app/features/intex-methodology/intex-methodology').then(m => m.IntexMethodology),
  },
  {
    path: 'blog',
    loadComponent: () =>import('../app/features/blog-component/blog-component').then(m => m.BlogComponent),
  },
  {
    path: 'blog-details',
    loadComponent: () =>import('../app/features/blog-component/container/blog-detail-component/blog-detail-component').then(m => m.BlogDetailComponent),
  },
  {
    path: 'partner-city',
    loadComponent: () =>import('../app/features/partner-city/partner-city').then(m => m.PartnerCity),
  },
  {
    path: 'research-publication',
    loadComponent: () =>import('../app/features/research-publication/research-publication').then(m => m.ResearchPublication),
  },
  {
    path: 'contact',
    loadComponent: () =>import('../app/features/contact-component/contact-component').then(m => m.ContactComponent),
  },
  {
    path: '**',
    redirectTo: '',
  }
];

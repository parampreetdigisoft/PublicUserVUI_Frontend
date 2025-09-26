import { Routes } from '@angular/router';
import { ForgetPasswordComponent } from './container/forget-password-component/forget-password-component';
import { SignUpComponent } from './container/sign-up-component/sign-up-component';
import { LoginComponent } from './container/login-component/login-component';
import { AuthComponent } from './auth-component';

export const AUTH_ROUTES: Routes = [
  {
    path: '',
    component: AuthComponent,
    data: { roles: [] },
    children: [
      {path:'',redirectTo: 'login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent,data: { roles: 'login'}},
      { path: 'sign-up', component: SignUpComponent,data: { roles: 'sign-up'}},
      { path: 'forgot-password', component: ForgetPasswordComponent ,data: { roles: 'forgot-password'}},
      { path: 'reset-password', component: ForgetPasswordComponent ,data: { roles: 'reset-password'}}
    ],
  },
];

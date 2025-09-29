import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard-component';
import { PaymentComponent } from './container/payment-component/payment-component';
import { PaymentSuccessComponent } from './container/payment-success-component/payment-success-component';
import { PaymentCancelComponent } from './container/payment-cancel-component/payment-cancel-component';


export const Dashboard_ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    data: { roles: [] },
    children: [
      {path:'',redirectTo: 'payment', pathMatch: 'full'},
      { path: 'payment', component: PaymentComponent,data: { roles: 'payment'}},
      { path: 'payment-success', component: PaymentSuccessComponent,data: { roles: 'payment-success'}},
      { path: 'payment-cancel', component: PaymentCancelComponent,data: { roles: 'payment-cancel'}}
    ],
  },
];

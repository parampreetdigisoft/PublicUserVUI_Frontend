import { Component } from '@angular/core';
import { PaymentComponent } from './container/payment-component/payment-component';
import { PaymentSuccessComponent } from './container/payment-success-component/payment-success-component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard-component',
  imports: [CommonModule,PaymentComponent,PaymentSuccessComponent],
  templateUrl: './dashboard-component.html',
  styleUrl: './dashboard-component.css'
})
export class DashboardComponent {

}

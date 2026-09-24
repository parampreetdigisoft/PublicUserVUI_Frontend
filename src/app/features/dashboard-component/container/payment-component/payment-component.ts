import { Component, OnInit } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-payment-component',
  imports: [CommonModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit {
  userId!: string;
  //stripePromise = loadStripe('pk_test_...'); 
  plans = [
    { name: 'Basic', priceId: 'price_basic' },
    { name: 'Standard', priceId: 'price_standard' },
    { name: 'Premium', priceId: 'price_premium' }
  ];

  constructor(private paymentService: PaymentService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    this.route.queryParams.subscribe(qp => this.userId = qp['userId']);
  }

  // async selectPlan(plan: any) {
  //   if (!this.userId) { alert('User missing'); return; }

  //   this.paymentService.createCheckoutSession(this.userId, plan.priceId).subscribe(async res => {
  //     const stripe = await this.stripePromise;
  //     if (!stripe) { alert('Stripe failed to load'); return; }
  //     const { error } = await stripe.redirectToCheckout({ sessionId: res.sessionId });
  //     if (error) {
  //       console.error(error);
  //       // show friendly error to user; they can try again
  //     }
  //   }, err => {
  //     console.error(err);
  //     alert('Failed to create checkout session');
  //   });
  // }
}
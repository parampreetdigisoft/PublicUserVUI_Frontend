import { Component, OnInit, signal } from '@angular/core';
import { PaymentService } from '../../../../core/services/payment-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { loadStripe } from '@stripe/stripe-js';
import { ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../../../environments/environment';
import { ICreateCheckoutSessionDto, IPlan } from '../../../../core/interfaces/ICreateCheckoutSessionDto';
import { TieredAccessPlanValue } from '../../../../core/enums/TieredAccessPlan';
import { UserService } from '../../../../core/services/user-service';
import { ToasterService } from '../../../../core/services/toaster-service';

@Component({
  selector: 'app-payment-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './payment-component.html',
  styleUrl: './payment-component.css'
})
export class PaymentComponent implements OnInit {
  userId!: string;
  stripePromise = loadStripe(environment.stripePublicKey);
  plans: IPlan[] = [
    { name: 'Basic', tier: TieredAccessPlanValue.Basic, amount: 10 },
    { name: 'Standard', tier: TieredAccessPlanValue.Standard, amount: 30 },
    { name: 'Premium', tier: TieredAccessPlanValue.Premium, amount: 50 }
  ];

  constructor(private paymentService: PaymentService, private userService: UserService, private toasterService: ToasterService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(qp => this.userId = qp['userId']);
  }

  async selectPlan(plan: IPlan) {
    let payload: ICreateCheckoutSessionDto = {
      userID: this.userService.userInfo?.userID ?? 0,
      tier: plan.tier,
      amount: plan.amount
    }

    this.paymentService.createCheckoutSession(payload).subscribe({
      next: async (res) => {
        if (res.succeeded && res.result) {
          const stripe = await this.stripePromise;
          if (stripe) {
            if (!stripe) { alert('Stripe failed to load'); return; }
            const { error } = await stripe.redirectToCheckout({ sessionId: res.result.sessionId });
            if (error) {
              this.toasterService.showError("An error occured " + error.message);
            }
          } else {
            this.toasterService.showError("Stripe failed to load");
          }
        }
        else {
          this.toasterService.showError(res.errors.join(", "));
        }
      },
      error: () => {
        this.toasterService.showError("Failed to create checkout session");
      }
    });
  }
}
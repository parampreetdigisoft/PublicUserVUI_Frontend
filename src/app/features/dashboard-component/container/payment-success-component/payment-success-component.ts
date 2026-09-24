import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PaymentService } from '../../../../core/services/payment-service';

@Component({
  selector: 'app-payment-success-component',
  imports: [],
  templateUrl: './payment-success-component.html',
  styleUrl: './payment-success-component.css'
})
export class PaymentSuccessComponent {
    status: string | null = null;
  sessionId?: string;

  constructor(private route: ActivatedRoute, private paymentService: PaymentService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(qp => {
      this.sessionId = qp['session_id'];
      if (this.sessionId) this.check();
    });
  }

  check() {
    if (!this.sessionId) return;
    this.paymentService.verifySession(this.sessionId).subscribe((res:any) => {
      this.status = res.status;
    }, err => {
      console.error(err);
      this.status = 'pending';
    });
  }
}

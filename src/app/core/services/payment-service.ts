import { inject, Injectable } from '@angular/core';
import { HttpService } from './http-service';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
    http = inject(HttpService);
   createCheckoutSession(userId: string, priceId: string) {
    return this.http.post('/api/payment/create-checkout-session', { userId, priceId });
  }

  verifySession(sessionId: string) {
    return this.http.get(`/api/payment/verify-session?sessionId=${sessionId}`);
  }
}

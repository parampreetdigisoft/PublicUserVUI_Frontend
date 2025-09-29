import { inject, Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { ICreateCheckoutSessionDto } from '../interfaces/ICreateCheckoutSessionDto';
import { map } from 'rxjs';
import { IResultResponseDto } from '../interfaces/IResultResponseDto';
import { CheckoutSessionResponse, VerifySessionResponse } from '../models/CheckoutSessionResponse';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  http = inject(HttpService);

  createCheckoutSession(payload: ICreateCheckoutSessionDto) {
    return this.http.post('Payment/create-checkout-session', payload).pipe(map((x) => x as IResultResponseDto<CheckoutSessionResponse>));
  }

  verifySession(payload: any) {
    return this.http.post(`Payment/verify-session`, payload).pipe(map((x) => x as IResultResponseDto<VerifySessionResponse>));;
  }
}

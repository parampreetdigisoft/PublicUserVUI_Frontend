import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthPopUp } from '../auth-pop-up/auth-pop-up';

@Component({
  selector: 'app-forget-password-component',
  imports: [AuthPopUp,FormsModule],
  templateUrl: './forget-password-component.html',
  styleUrl: './forget-password-component.css',
})
export class ForgetPasswordComponent {
 forgotPassword = output<any>();
 loading = input<boolean>(false);
 isSuccess = input<boolean>(false);
 resendEmail = input<boolean>(false);


  email: string = '';

  constructor(private router: Router) {}

  onSubmit(form: NgForm) {
    this.forgotPassword.emit(this.email);
  }
  popUpEvent() {
    setTimeout(() => {
      this.router.navigate(['/auth/login']);
    }, 5000);
  }
}

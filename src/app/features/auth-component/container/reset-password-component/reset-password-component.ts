import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../../auth-service';
import { CommonModule } from '@angular/common';
import { AuthPopUp } from '../auth-pop-up/auth-pop-up';

@Component({
  selector: 'app-reset-password-component',
  imports: [CommonModule,ReactiveFormsModule,AuthPopUp],
  templateUrl: './reset-password-component.html',
  styleUrl: './reset-password-component.css',
})
export class ResetPasswordComponent {
  resetPassword = output<any>();
  loading = input<boolean>(false);
  isSuccess = input<boolean>(false);

  public resetPasswordForm: FormGroup = new FormGroup({});
  private destroy$ = new Subject();
  params: any;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.resetForm();
    this.activatedRoute.queryParams.pipe(takeUntil(this.destroy$)).subscribe((params) => {
      this.params = params;
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next(null);
  }

  private resetForm() {
    this.resetPasswordForm = this.fb.group(
      {
        password: [
          null,
          [
            Validators.required,
            Validators.minLength(8),
            Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{0,40}$'),
          ],
        ],
        confirmPassword: [null, [Validators.required]],
        passwordToken: [null, [Validators.required]],
      },
      { validator: this.confirmPasswordValidator('password', 'confirmPassword') }
    );
  }

  private confirmPasswordValidator(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['confirmPasswordValidator']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ confirmPasswordValidator: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  public onSubmit() {
    this.resetPasswordForm?.patchValue({
      passwordToken: this.params['PasswordToken'],
    });
    this.resetPassword.emit(this.resetPasswordForm);
  }

  popUpEvent() {
    this.router.navigate(['/auth/login']);
  }
}

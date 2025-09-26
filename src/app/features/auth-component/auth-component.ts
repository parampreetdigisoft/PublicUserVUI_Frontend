import { Component, OnInit, signal, WritableSignal } from '@angular/core';
import { ForgetPasswordComponent } from './container/forget-password-component/forget-password-component';
import { LoginComponent } from './container/login-component/login-component';
import { SignUpComponent } from './container/sign-up-component/sign-up-component';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../core/services/user-service';
import { ToasterService } from '../../core/services/toaster-service';
import { filter, map, mergeMap, Subject } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { AuthService } from './auth-service';
import { CityUserSignUpDto } from '../../core/models/SignUpDto';
import { AuthPopUp } from './container/auth-pop-up/auth-pop-up';
import { ResetPasswordComponent } from './container/reset-password-component/reset-password-component';

@Component({
  selector: 'app-auth-component',
  imports: [ForgetPasswordComponent, LoginComponent, SignUpComponent, ResetPasswordComponent, AuthPopUp],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent implements OnInit {
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public roleName: WritableSignal<string> = signal<string>('login');
  isSuccess: WritableSignal<boolean> = signal<boolean>(false);
  isSignUp: WritableSignal<boolean> = signal<boolean>(false);
  resendEmail: WritableSignal<boolean> = signal<boolean>(false);
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toasterService: ToasterService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.RenderActivatedRoute();
  }
  private RenderActivatedRoute() {
    const deepest = this.getDeepestChild(this.route);
    this.roleName.set(deepest?.snapshot?.data['roles'] ?? '');

    // 2️⃣ Subscribe to future navigations
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.getDeepestChild(this.route)),
        mergeMap((r) => r.data)
      )
      .subscribe((data) => {
        this.roleName.set(data['roles'] ?? '');
        this.loading.set(false);
        this.isSuccess.set(false);
        this.isSignUp.set(false);
      });
  }
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let r = route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r;
  }
  popUpEvent() {
    this.resendEmail.set(true);
    this.router.navigate(['/auth/forgot-password']);
  }
    public login(event: any) {
    if (!this.loading()) {
      if (event.email != null && event.password != null) {
        this.loading.set(true);
        this.authService
          .login(event.email, event.password, event.rememberMe)
          .subscribe({
            next: (res) => {
              this.loading.set(false);
              if (res.succeeded) {
                this.toasterService.showSuccess('Login successful');
                this.router.navigate(['']);
              } else {
                this.toasterService.showError(res?.errors?.join(', '));
              }
            },
            error: (err) => {
              this.loading.set(false);
              this.toasterService.showError('Invalid credentials');
            },
          });
      }
    }
  }
  public cityUserSignUp(event: CityUserSignUpDto) {
    if (!this.loading()) {
      if (event) {
        this.loading.set(true);
        this.authService
          .cityUserSignUp(event)
          .subscribe({
            next: (res) => {
              this.loading.set(false);
              if (res.succeeded) {
                this.isSignUp.set(true);
                this.toasterService.showSuccess('Signed Up Successfully');
              } else {
                this.toasterService.showError(res?.errors?.join(', '));
              }
            },
            error: (err) => {
              this.loading.set(false);
              this.toasterService.showError('Invalid credentials');
            },
          });
      }
    }
  }

  public resetPassword(event: FormGroup) {
    if (!this.loading()) {
      if (event.value.password != null) {
        this.loading.set(true);
        this.authService.resetPassword(event.value).subscribe({
          next: (res) => {
            this.loading.set(false);
            if (res.succeeded) {
              this.isSuccess.set(true);
              this.toasterService.showSuccess('Password changed successfully');
            } else {
              this.toasterService.showError(res?.errors?.join(', '));
            }
          },
          error: (err) => {
            this.loading.set(false);
          },
        });
      }
    }
  }
  public sendEmail(email: string) {
    console.log(email);
    if (!this.loading()) {
      this.loading.set(true);
      this.authService.forgotPassword(email)
        .subscribe({
          next: (res: any) => {
            this.loading.set(false);
            if(res.succeeded){
             this.isSuccess.set(true);
             this.toasterService.showSuccess(res.messages.join(", "))
            }
            else{
              this.toasterService.showError(res.errors.join(","))
            }
          },
          error: (err) => {
            this.loading.set(false);
          },
        })
    }
  }
}

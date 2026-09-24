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

@Component({
  selector: 'app-auth-component',
  imports: [ForgetPasswordComponent, LoginComponent, SignUpComponent],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent implements OnInit {
  public errorMessage: WritableSignal<string> = signal<string>('');
  public loading: WritableSignal<boolean> = signal<boolean>(false);
  public roleName: WritableSignal<string> = signal<string>('login');
  private destroy$ = new Subject();
  isSuccess: WritableSignal<boolean> = signal<boolean>(false);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private toasterService: ToasterService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.RenderActivatedRoute();
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
                this.toasterService.showSuccess('Login successful');
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
      });
  }
  private getDeepestChild(route: ActivatedRoute): ActivatedRoute {
    let r = route;
    while (r.firstChild) {
      r = r.firstChild;
    }
    return r;
  }
}

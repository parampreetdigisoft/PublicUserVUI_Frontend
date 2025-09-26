import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, input, OnInit, output, signal, Signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRole, UserRoleValue } from '../../../../core/enums/UserRole';
import { CityUserSignUpDto } from '../../../../core/models/SignUpDto';
import { AuthService } from '../../auth-service';
import { environment } from '../../../../../environments/environment';
import { ToasterService } from '../../../../core/services/toaster-service';
import { CommonService } from '../../../../core/services/common-service';
import { CityVM } from '../../../../core/models/CityVM';
import { AuthPopUp } from '../auth-pop-up/auth-pop-up';
declare const FB: any;

@Component({
  selector: 'app-sign-up-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.css',
})
export class SignUpComponent implements OnInit, AfterViewInit {
  signupForm: FormGroup;

  submitsignUpDetail = output<CityUserSignUpDto>();
  loading = input<boolean>(false);

  externalLogin = signal<CityUserSignUpDto | null>(null);
  
  cities= signal<CityVM[]>([]);

  phonePattern = /^\+?\d{7,15}$/; // allows optional + and 7-15 digits

  constructor(private fb: FormBuilder, private authService: AuthService, private toasterService:ToasterService, private commonService : CommonService) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      city: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.getCities();
  }

  externalLoginForm(external: CityUserSignUpDto) {
    this.externalLogin.set(external);
    this.signupForm = this.fb.group({
      city: ['', [Validators.required]],
    });
  }
  getCities(){
    this.commonService.getAllCities().subscribe({
      next: (res)=>{
        if(res.succeeded && res.result){
          this.cities.set(res.result);
        }
        else{
          this.toasterService.showError("Please refresh page and try again")
        }
      },
      error: ()=>{
        this.toasterService.showError("Please refresh page or check you internent connection")
      }
    })
  }

  ngAfterViewInit() {
    this.authService.initGoogleButton('googleBtn', (response) => {
      const user = JSON.parse(atob(response.credential.split('.')[1]));
      if (user?.name && user?.email) {
        let payload: CityUserSignUpDto = {
          fullName: user.name,
          email: user.email,
          phone: '',
          password: '',
          cityID: 0,
          role: UserRoleValue.CityUser,
        };
        this.externalLoginForm(payload);
      }
       else {
          this.toasterService.showError("There is an error Please try again")
        }
    });

    if (typeof FB !== 'undefined') {
      FB.init({
        appId: environment.facebookAppId,
        cookie: true,
        xfbml: true,
        version: 'v19.0',
      });
    }
  }
  loginWithFacebook() {
    FB.login(
      (response: any) => {
        if (response.authResponse) {
          FB.api('/me', { fields: 'name,email,picture' }, (user: any) => {
            if (user?.name && user?.email) {
              let payload: CityUserSignUpDto = {
                fullName: user.name,
                email: user.email,
                phone: '',
                password: '',
                cityID: 0,
                role: UserRoleValue.CityUser,
              };
              this.externalLoginForm(payload);
            }
            else {
              this.toasterService.showError("There is an error Please try again")
            }
          });
        }
        else {
          this.toasterService.showError("There is an error Please try again")
        }
      },
      { scope: 'email' }
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  CreateAccount() {
    if (this.externalLogin() == null) return;

    let f = this.signupForm.value;
    let v: CityUserSignUpDto = this.externalLogin()!;
    this.externalLogin.set({
      ...v,
      cityID: Number(f.city),
    });

    this.submitsignUpDetail.emit(this.externalLogin()!);
  }

  submit() {
    if (this.signupForm.invalid) {
      // mark all controls as touched to show validation messages
      Object.values(this.signupForm.controls).forEach((control) => control.markAsTouched());
      return;
    }
    let f = this.signupForm.value;
    let payload: CityUserSignUpDto = {
      fullName: f?.fullName,
      email: f?.email,
      phone: f?.phone,
      password: '',
      cityID: Number(f.city),
      role: UserRoleValue.CityUser,
    };
    this.submitsignUpDetail.emit(payload);
  }
}

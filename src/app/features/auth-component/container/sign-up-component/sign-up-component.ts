import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserRole, UserRoleValue } from '../../../../core/enums/UserRole';
import { CityUserSignUpDto } from '../../../../core/models/SignUpDto';

@Component({
  selector: 'app-sign-up-component',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './sign-up-component.html',
  styleUrl: './sign-up-component.css',
})
export class SignUpComponent {
  signupForm: FormGroup;

  submitsignUpDetail = output<CityUserSignUpDto>();
  loading = input<boolean>(false);

  cities = [
    {cityId:1, id: 'delhi', name: 'Delhi' },
    {cityId:2, id: 'mumbai', name: 'Mumbai' },
    {cityId:3, id: 'bangalore', name: 'Bangalore' },
    {cityId:4, id: 'chennai', name: 'Chennai' },
    {cityId:5, id: 'kolkata', name: 'Kolkata' },
  ];

  phonePattern = /^\+?\d{7,15}$/; // allows optional + and 7-15 digits

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(this.phonePattern)]],
      city: ['', [Validators.required]],
    });
  }

  get f() {
    return this.signupForm.controls;
  }

  submit() {
    if (this.signupForm.invalid) {
      // mark all controls as touched to show validation messages
      Object.values(this.signupForm.controls).forEach((control) => control.markAsTouched());
      return;
    }
    let f =this.signupForm.value;
    let payload:CityUserSignUpDto={
        fullName: f?.fullName,
        email: f?.email,
        phone: f?.phone,
        password: '',
        cityID: 0,
        role: UserRoleValue.CityUser
    }
    this.submitsignUpDetail.emit(payload);
  }
}

import { Component, input, OnInit, output, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginRequestDto } from '../../../../core/models/SignUpDto';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login-component',
  imports: [CommonModule, ReactiveFormsModule,RouterLink],
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  submitted = signal<boolean>(false);
  loading= input<boolean>(false);
  onSubmitLoginDetail = output<LoginRequestDto>()

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      rememberMe:[true]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted.set(true);
    if (this.loginForm.invalid) {
      return;
    }
    this.onSubmitLoginDetail.emit(this.loginForm.value);
  }
}

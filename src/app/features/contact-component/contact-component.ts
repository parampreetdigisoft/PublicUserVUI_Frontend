import { Component, inject } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { RecaptchaModule } from 'ng-recaptcha-2';
import { Form, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ContactUsRequestDto } from '../../core/models/ContactUsRequestDto';
import { PublicService } from '../../core/services/public-service';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-contact-component',
  imports: [CommonModule, FormsModule, RecaptchaModule,ReactiveFormsModule],
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css'
})
export class ContactComponent {
  captchaToken: string | null = null;
  contactForm!: FormGroup;
  constructor(private fb: FormBuilder, private common:CommonService, 
    private publicService:PublicService, private toasterService:ToasterService ) {

    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      city: ['', Validators.required],
      country: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
      recaptcha: ['', Validators.required]
    });
  }


  resolved(token: string | null) {
    this.captchaToken = token;
    this.contactForm.patchValue({ recaptcha: token });
  }

  onSubmit() {
    if (this.contactForm.valid) {

      let payload:ContactUsRequestDto = {
        ...this.contactForm.value
      }
      //console.log('Form Submitted:', this.contactForm.value,payload);

      this.publicService.contactus(payload).subscribe({
        next:(res)=>{
          if(res.succeeded){
            this.toasterService.showSuccess(res.messages.join(', '));
            this.contactForm.reset();
          } else {
            this.toasterService.showError(res.errors.join(', ') );
          }
        },
        error:(err)=>{
          this.toasterService.showError('Failed to send your message. Please try again later.');
        }
      });
    } else {
      this.contactForm.markAllAsTouched();
    }
  }


  loginCityUser() {
    let url = '/auth/login';
    this.common.goToSubscriptionApp(url);
  }

  goToSite() {
    this.common.goToSubscriptionApp();
  }

  loginAdmin() {
    let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToSubscriptionApp(url);
  }
}

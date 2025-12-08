import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cookie-consent',
  imports: [CommonModule,RouterLink],
  templateUrl: './cookie-consent.html',
  styleUrl: './cookie-consent.css'
})
export class CookieConsent implements OnInit {

  cookieService = inject(CookieService);
  showBanner = false;
   ngOnInit() {
    const consent = this.cookieService.get('vus_cookie_consent');

    if (!consent) {
      this.showBanner = true; // show only if not set
    }
  }

  acceptCookies() {
    this.cookieService.set(
      'vus_cookie_consent',
      'accepted',
      365,   // days
      '/',
      '',
      true,  // secure
      'Strict'
    );

    this.showBanner = false;
    this.enablePerformanceFeatures();
  }

  rejectCookies() {
    this.cookieService.set(
      'vus_cookie_consent',
      'rejected',
      365,
      '/',
      '',
      true,
      'Strict'
    );

    this.showBanner = false;
  }

  enablePerformanceFeatures() {
    // PERFORMANCE FEATURES WILL LOAD ONLY AFTER ACCEPTANCE
    console.log('Cookies accepted. Performance features enabled.');
  }

}

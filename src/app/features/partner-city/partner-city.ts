import { Component, inject } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';

@Component({
  selector: 'app-partner-city',
  imports: [],
  templateUrl: './partner-city.html',
  styleUrl: './partner-city.css'
})
export class PartnerCity {
private common = inject(CommonService);

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

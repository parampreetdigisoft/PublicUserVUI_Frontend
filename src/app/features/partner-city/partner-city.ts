import { Component, inject } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { pillarsData } from '../../core/data/pillarData';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-partner-city',
  imports: [CommonModule],
  templateUrl: './partner-city.html',
  styleUrl: './partner-city.css'
})
export class PartnerCity {
private common = inject(CommonService);
pillars = pillarsData;

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

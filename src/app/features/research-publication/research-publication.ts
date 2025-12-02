import { Component, inject } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';

@Component({
  selector: 'app-research-publication',
  imports: [],
  templateUrl: './research-publication.html',
  styleUrl: './research-publication.css'
})
export class ResearchPublication {
  private common = inject(CommonService);

  loginCityUser() {
    this.common.goToSubscriptionApp();
  }
  
  goToSite() {
    this.common.goToSubscriptionApp();
  }
  
  loginAdmin() {
    //let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToAdminApp();
  }
}

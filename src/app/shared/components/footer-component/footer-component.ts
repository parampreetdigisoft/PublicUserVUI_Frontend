import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../../core/services/common-service';
import { UserRoleValue } from '../../../core/models/UserRole';

@Component({
  selector: 'app-footer-component',
  imports: [RouterLink],
  templateUrl: './footer-component.html',
  styleUrl: './footer-component.css'
})
export class FooterComponent {
  
  public common = inject(CommonService);

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

import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonService } from '../../../core/services/common-service';
import { UserRoleValue } from '../../../core/models/UserRole';

@Component({
  selector: 'app-hearder-component',
  imports: [RouterLink, RouterLinkActive, CommonModule],
  templateUrl: './hearder-component.html',
  styleUrl: './hearder-component.css'
})
export class HearderComponent {

  public common = inject(CommonService);

  loginCityUser() {
    this.common.goToSubscriptionApp();
  }
  
  goToSite() {
    this.common.goToSubscriptionApp();
  }
  
  loginAdmin() {
    let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToAdminApp(url);
  }
}
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';

@Component({
  selector: 'app-blog-component',
  imports: [RouterLink],
  templateUrl: './blog-component.html',
  styleUrl: './blog-component.css'
})
export class BlogComponent {
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

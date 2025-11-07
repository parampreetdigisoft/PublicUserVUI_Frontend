import { Component, inject } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';
import { UserRoleValue } from '../../../../core/models/UserRole';
import { Blog1 } from '../blog1/blog1';
import { Blog2 } from '../blog2/blog2';
import { Blog3 } from '../blog3/blog3';
import { Blog4 } from '../blog4/blog4';
import { Blog5 } from '../blog5/blog5';

@Component({
  selector: 'app-blog-detail-component',
  imports: [Blog1, Blog2, Blog3, Blog4, Blog5],
  templateUrl: './blog-detail-component.html',
  styleUrl: './blog-detail-component.css'
})
export class BlogDetailComponent {
private common = inject(CommonService);

  loginCityUser() {

    this.common.goToSubscriptionApp();
  }
  
  goToSite() {
    this.common.goToSubscriptionApp();
  }
  
  loginAdmin() {
    let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToSubscriptionApp(url);
  }
}

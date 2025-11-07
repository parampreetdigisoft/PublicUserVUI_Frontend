import { Component, inject, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';
import { UserRoleValue } from '../../../../core/models/UserRole';
import { Blog1 } from '../blog1/blog1';
import { Blog2 } from '../blog2/blog2';
import { Blog3 } from '../blog3/blog3';
import { Blog4 } from '../blog4/blog4';
import { Blog5 } from '../blog5/blog5';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Blog6 } from '../blog6/blog6';
import { Blog7 } from '../blog7/blog7';
import { Blog8 } from '../blog8/blog8';
import { Blog9 } from '../blog9/blog9';

@Component({
  selector: 'app-blog-detail-component',
  imports: [Blog1, Blog2, Blog3, Blog4, Blog5, Blog6, Blog7, Blog8, Blog9, CommonModule],
  templateUrl: './blog-detail-component.html',
  styleUrl: './blog-detail-component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  private common = inject(CommonService);
  private route = inject(ActivatedRoute);
  blogID: string | null = null;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.blogID = params.get('blogID');
    });
  }


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

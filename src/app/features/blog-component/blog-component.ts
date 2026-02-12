import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common-service';
import { PublicService } from '../../core/services/public-service';
import { BlogVM } from '../../core/models/BlogVM';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-blog-component',
  imports: [RouterLink, CommonModule],
  templateUrl: './blog-component.html',
  styleUrl: './blog-component.css'
})
export class BlogComponent implements OnInit {

  private common = inject(CommonService);
  private publicService = inject(PublicService);
  private toast = inject(ToasterService);
  url = environment.apiUrl;
  blogs = signal<BlogVM[]>([]);


  ngOnInit(): void {
    this.getPublicUsersBlogs();
  }

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
  getPublicUsersBlogs() {
    this.publicService.getPublicUsersBlogs().subscribe({
      next: (res) => {
        this.blogs.set((res.result ?? []).map(p => ({
          ...p,
          expand: false
        })));
      },
      error: () => {
        this.toast.showError("Error in getting blogs, Please try again");
      }
    });
  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '/blog1.png';
  }
}

import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonService } from '../../core/services/common-service';
import { PublicService } from '../../core/services/public-service';
import { BlogVM } from '../../core/models/BlogVM';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { ToasterService } from '../../core/services/toaster.service';
import { PaginationRequest } from '../../core/models/PaginationRequest';
import { SortDirection } from '../../core/enums/SortDirection';

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
  totalRecords = signal(0);
  pageSize = signal(10);
  currentPage = signal(0);
  loading = signal(false);

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
  getPublicUsersBlogs(currentPage = this.currentPage()) {
        let payload: PaginationRequest = {
      sortDirection: SortDirection.DESC,
      sortBy: 'publishDate',
      pageNumber: currentPage + 1,
      pageSize: this.pageSize()
    }

    this.publicService.getPublicUsersBlogs(payload).subscribe({
      next: (res) => {
        this.totalRecords.set(res.totalRecords);
        this.currentPage.set(res.pageNumber);
        this.pageSize.set(res.pageSize);
        this.blogs.set(res.data ?? []);
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

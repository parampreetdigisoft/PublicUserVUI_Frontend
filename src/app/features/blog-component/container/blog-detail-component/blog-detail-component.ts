import { Component, inject, OnInit, signal, ViewEncapsulation } from '@angular/core';
import { CommonService } from '../../../../core/services/common-service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../../../core/services/public-service';
import { BlogVM } from '../../../../core/models/BlogVM';
import { ToasterService } from '../../../../core/services/toaster.service';

@Component({
  selector: 'app-blog-detail-component',
  imports: [CommonModule],
  templateUrl: './blog-detail-component.html',
  styleUrl: './blog-detail-component.css',
  encapsulation: ViewEncapsulation.None,
})
export class BlogDetailComponent implements OnInit {
  private common = inject(CommonService);
  private route = inject(ActivatedRoute);
  private toast = inject(ToasterService);
  private publicService = inject(PublicService);
  blogID: number=0;
  blog = signal<BlogVM | null>(null);

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      let id = params.get('blogID');
      this.blogID = Number(id)

      if(this.blogID > 0){
        this.getBlogById();
      }
    });
  }

  getBlogById() {
    this.publicService.getBlogById(this.blogID).subscribe({
      next:(res)=> {
        this.blog.set(res.result);
      },
      error:()=> { 
        this.toast.showError("Error in getting blog, Please try again"); 
      }
    });
  
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

  decodeHtml(text: string | undefined): string {
    if(text == undefined) return '';
    const txt = document.createElement('textarea');
    txt.innerHTML = text;
    return txt.value.replace(/\u00a0/g, ' '); // Replace non-breaking space with normal space
  }
}

import { Component, inject, signal } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { ToasterService } from '../../core/services/toaster.service';
import { PublicService } from '../../core/services/public-service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intex-methodology',
  imports: [CommonModule],
  templateUrl: './intex-methodology.html',
  styleUrl: './intex-methodology.css'
})
export class IntexMethodology {
  private common = inject(CommonService);
  private publicService = inject(PublicService);
  private toaster = inject(ToasterService);
  loading = signal(false);
  
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

  DownloadSummeryReportPdf() {
    this.loading.set(true);
    this.publicService.DownloadSummeryReportPdf().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        const url = window.URL.createObjectURL(res);
        const a = document.createElement("a");
        a.href = url;
        a.download = "summary-report.pdf.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.toaster.showSuccess("summary-report downloaded successfully");
      },
      error: (err: any) => {
        this.loading.set(false);
        this.toaster.showError("Failed to download summary-report");
      }
    })
  }

}

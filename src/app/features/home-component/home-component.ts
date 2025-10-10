
import { AfterViewInit, Component, computed, ElementRef, inject, OnDestroy, OnInit, signal, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { FrequentlyAskQuestions } from '../../shared/components/frequently-ask-questions/frequently-ask-questions';
import { PublicService } from '../../core/services/public-service';
import { ToasterService } from '../../core/services/toaster.service';
import { PartnerCityResponseDto } from '../../core/models/PartnerCityHistoryResponseDto';
import { SortDirection } from '../../core/enums/SortDirection';
import { PartnerCityRequest } from '../../core/models/PaginationRequest';
import { StorageKeyEnum } from '../../core/enums/StorageKeyEnum';
import { TieredAccessPlan } from '../../core/models/TieredAccessPlan';

@Component({
  selector: 'app-home-component',
  imports: [RouterLink, CommonModule, FrequentlyAskQuestions],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css'
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  pillars = [
    "environmental",
    "economic",
    "Social"
  ];

  // BehaviorSubject (in case you want to add/remove dynamically later)
  private pillarSubject = new BehaviorSubject<string[]>(this.pillars);
  pillars$ = this.pillarSubject.asObservable();

  @ViewChild('scrollTrack', { static: false }) trackRef!: ElementRef<HTMLDivElement>;
  urlBase = environment.apiUrl;
  private animationFrameId: number = 0;
  private position: number = 0;
  private speed: number = 0.5; // pixels per frame, adjust speed
  private common = inject(CommonService);
  private publicService = inject(PublicService);
  private toaster = inject(ToasterService);
  loading = signal(false);
  citiesResponse = signal<PartnerCityResponseDto[] | undefined>(undefined);

  firstCities = computed<PartnerCityResponseDto[]>(() => {
    let s = this.citiesResponse() ? this.citiesResponse()!.slice(0, 2) : [];
    return s;
  });

  secondCities = computed<PartnerCityResponseDto[]>(() => {
    let s = this.citiesResponse() ? this.citiesResponse()!.slice(2, 5) : [];
    return s;
  });
  ngOnInit(): void {
    this.getCities();
  }
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '../../../../partner_cities.jpg';
  }

  loginCityUser() {
    let url = '/auth/login';
    this.common.goToSubscriptionApp(url);
  }
  getCities() {
    let payload: PartnerCityRequest = {
      sortDirection: SortDirection.DESC,
      sortBy: 'score',
      pageNumber: 1,
      pageSize: 5
    }
    this.publicService.GetPartnerCities(payload).subscribe(cities => {
      this.citiesResponse.set(cities.data);
    });
  }
  goToSite() {
    this.common.goToSubscriptionApp();
  }
  choosePlan(planValue:number ) {
    let selectedPlan =TieredAccessPlan.Premium;
    if(planValue==1){
       selectedPlan= TieredAccessPlan.Basic;
    }
    else if(planValue==2){
       selectedPlan= TieredAccessPlan.Standard;
    }
  
    localStorage.setItem(StorageKeyEnum.SelectedPlan, selectedPlan );
    this.common.goToSubscriptionApp();
  }
  loginAdmin() {
    let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToSubscriptionApp(url);
  }

  ngAfterViewInit(): void {
    this.animate();
  }

  private animate = () => {
    if (this.trackRef) {
      this.position -= this.speed;
      const track = this.trackRef.nativeElement;
      const resetPoint = track.scrollWidth / 2;

      if (-this.position >= resetPoint) {
        this.position = 0; // reset without jump
      }

      track.style.transform = `translateX(${this.position}px)`;
    }

    this.animationFrameId = requestAnimationFrame(this.animate);
  };
  DownloadExecutiveSummeryPdf() {
    this.loading.set(true);
    this.publicService.DownloadExecutiveSummeryPdf().subscribe({
      next: (res: any) => {
        this.loading.set(false);
        const url = window.URL.createObjectURL(res);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Executive-Summary.pdf";
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        this.toaster.showSuccess("Executive-Summary downloaded successfully");
      },
      error: (err: any) => {
        this.loading.set(false);
        this.toaster.showError("Failed to download Executive-Summary");
      }
    })
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationFrameId);
  }
}

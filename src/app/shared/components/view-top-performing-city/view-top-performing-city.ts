import { Component, OnInit, OnDestroy, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../../core/services/public-service';
import { ToasterService } from '../../../core/services/toaster.service';
import { PromotedPillarsResponseDto } from '../../../core/models/PromotedPillarsResponseDto';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view-top-performing-city',
  imports: [CommonModule],
  templateUrl: './view-top-performing-city.html',
  styleUrl: './view-top-performing-city.scss'

})


export class ViewTopPerformingCity implements OnInit, OnDestroy {
  currentView = signal<number>(0); // 0 for overall, 1-14 for pillars
  isTransitioning = signal(false);
  autoRotateInterval: any;
  path = environment.apiUrl + '/';
  // 14 Pillars with top 3 cities each
  pillars: PromotedPillarsResponseDto[] = [];
  totalViews = 14; // 1 overall + 14 pillars
  autoRotateDuration = 5000; // 5 seconds per view  


  constructor(private publicService: PublicService, private toaster: ToasterService, private ctx: ChangeDetectorRef) { }
  ngOnInit() {
    this.GetPartnerCitiesFilterRecord();
  }

  ngOnDestroy() {
    this.stopAutoRotation();
  }
  GetPartnerCitiesFilterRecord() {
    this.publicService.GetPromotedCities().subscribe({
      next: (res) => {
        if (res.succeeded && res.result) {
          this.pillars = res.result.map(pillar => ({
            ...pillar,
            cities: pillar.cities.map(city => ({
              ...city,
              description: city.description ? city.description.split('. ').slice(0, 2).join('. ') : ''
            }))
          }));

          this.ctx.detectChanges();
          this.startAutoRotation();
        }
        else {
          this.toaster.showError("There is an error to load promoated city")
        }

      },
      error: () => {
        this.toaster.showError("There is an error to load promoated city")
      }
    });
  }
  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '/Frame 1321315029.png';
  }
  startAutoRotation() {
    this.autoRotateInterval = setInterval(() => {
      this.nextView();
    }, this.autoRotateDuration);
  }

  stopAutoRotation() {
    if (this.autoRotateInterval) {
      clearInterval(this.autoRotateInterval);
    }
  }

  nextView() {
    this.isTransitioning.set(true);

    setTimeout(() => {
      const current = this.currentView();
      if (current === this.totalViews - 1) {
        this.currentView.set(0);
      } else {
        this.currentView.set(current + 1);
      }

      setTimeout(() => {
        this.isTransitioning.set(false);
      }, 50);
    }, 300);
  }

  previousView() {
    this.isTransitioning.set(true);

    setTimeout(() => {
      const current = this.currentView();
      if (current === 0) {
        this.currentView.set(this.totalViews - 1);
      } else {
        this.currentView.set(current - 1);
      }
      setTimeout(() => {
        this.isTransitioning.set(false);
      }, 50);
    }, 300);
  }

  goToView(index: number) {
    this.stopAutoRotation();
    this.isTransitioning.set(true);

    setTimeout(() => {
      this.currentView.set(index);

      setTimeout(() => {
        this.isTransitioning.set(false);
        this.startAutoRotation();
      }, 50);
    }, 300);
  }

  getCurrentPillar(): PromotedPillarsResponseDto | null {
    const current = this.currentView();
    if (typeof current === 'number' && current > 0) {
      return this.pillars[current - 1] || null;
    }
    return null;
  }

}


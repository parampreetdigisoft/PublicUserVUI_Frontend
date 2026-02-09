import { Component, OnInit, OnDestroy, signal, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicService } from '../../../core/services/public-service';
import { ToasterService } from '../../../core/services/toaster.service';
import { PromotedPillarsResponseDto } from '../../../core/models/PromotedPillarsResponseDto';
import { environment } from '../../../../environments/environment';

interface City {
  id: number;
  name: string;
  country: string;
  score: number;
  image: string;
  description: string;
  rank: number;
}


@Component({
  selector: 'app-view-top-performing-city',
  imports: [CommonModule],
  templateUrl: './view-top-performing-city.html',
  styleUrl: './view-top-performing-city.scss'

})


export class ViewTopPerformingCity implements OnInit, OnDestroy {
  currentView = signal<'overall' | number>(0); // 0 for overall, 1-14 for pillars
  isTransitioning = signal(false);
  autoRotateInterval: any;
  path = environment.apiUrl+'/';

  // Overall top 3 cities
  topCities: City[] = [
    {
      id: 1,
      name: 'Singapore',
      country: 'Singapore',
      score: 94.8,
      rank: 1,
      image: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?w=800&q=80',
      description: 'Singapore leads with exceptional governance, digital infrastructure, and environmental sustainability. The city-state demonstrates remarkable integration across all urban systems, setting global benchmarks in smart city innovation and resilient urban planning.'
    },
    {
      id: 2,
      name: 'Copenhagen',
      country: 'Denmark',
      score: 92.3,
      rank: 2,
      image: 'https://images.unsplash.com/photo-1513622470522-26c3c8a854bc?w=800&q=80',
      description: 'Copenhagen excels in climate resilience and sustainable mobility. The city\'s ambitious carbon-neutral targets, extensive cycling infrastructure, and innovative green urban planning make it a model for environmental leadership and quality of life.'
    },
    {
      id: 3,
      name: 'Zurich',
      country: 'Switzerland',
      score: 91.7,
      rank: 3,
      image: 'https://images.unsplash.com/photo-1516550893923-42d28e5677af?w=800&q=80',
      description: 'Zurich combines financial strength with social equity and environmental stewardship. The city demonstrates excellence in public services, economic opportunity, and cultural preservation while maintaining one of the highest quality of life standards globally.'
    }
  ];

  // 14 Pillars with top 3 cities each
  pillars: PromotedPillarsResponseDto[] = [];
  totalViews = 15; // 1 overall + 14 pillars
  autoRotateDuration = 3000; // 5 seconds per view  


  constructor(private publicService: PublicService, private toaster: ToasterService, private ctx:ChangeDetectorRef) { }
  ngOnInit() {
    this.startAutoRotation();
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
              description: city.description? city.description.split('. ').slice(0, 2).join('. '): ''
            }))
          }));

          this.ctx.detectChanges();
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
        this.currentView.set(typeof current === 'number' ? current + 1 : 1);
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
        this.currentView.set(typeof current === 'number' ? current - 1 : 0);
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

  isOverallView(): boolean {
    return this.currentView() === 0;
  }

}
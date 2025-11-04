import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { PublicService } from '../../core/services/public-service';
import { environment } from '../../../environments/environment';
import { PartnerCityResponseDto } from '../../core/models/PartnerCityHistoryResponseDto';
import { PillarResponseDto } from '../../core/models/PillarResponseDto';
import { PartnerCityFilterResponse } from '../../core/models/PartnerCityFilterResponse';
import { FrequentlyAskQuestions } from '../../shared/components/frequently-ask-questions/frequently-ask-questions';

@Component({
  selector: 'app-partner-city',
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule, FrequentlyAskQuestions],
  templateUrl: './partner-city.html',
  styleUrl: './partner-city.css'
})
export class PartnerCity implements OnInit {
  private common = inject(CommonService);
  pillars: PillarResponseDto[] = [];
  filterData = signal<PartnerCityFilterResponse | null>(null);
  filterForm!: FormGroup;
  regions: string[] = ['North America', 'Europe', 'Asia', 'Australia', 'Africa', 'South America', 'Antarctica'];
  urlBase = environment.apiUrl;
  citiesResponse = signal<PartnerCityResponseDto[] | undefined>(undefined);
  totalRecords = signal(0);
  pageSize = signal(9);
  currentPage = signal(0);
  loading = signal(false);
  showMore = computed<boolean>(() => {
    let s = this.totalRecords() > (this.currentPage() * this.pageSize());
    //console.log('showMore',s,this.totalRecords, (this.currentPage * this.pageSize));
    return s;
  });
  constructor(private fb: FormBuilder, private publicService: PublicService) { }

  ngOnInit(): void {
    this.filterForm = this.fb.group({
      country: [null],
      region: [],
      city: [null],
      pillar: []
    });
    this.getCities();
    this.GetPartnerCitiesFilterRecord()
    this.GetAllPillarAsync();
  }

  getCities() {
     this.loading.set(false);
    // let payload: PartnerCityRequest = {
    //   sortDirection: SortDirection.DESC,
    //   sortBy: 'score',
    //   pageNumber: this.currentPage() + 1,
    //   pageSize: this.pageSize()
    // }
    // if (this.filterForm.get('pillar')?.value) {
    //   payload.pillarID = this.filterForm.get('pillar')?.value;
    // }
    // if (this.filterForm.get('country')?.value) {
    //   payload.country = this.filterForm.get('country')?.value;
    // }
    // if (this.filterForm.get('city')?.value) {
    //   payload.cityID = this.filterForm.get('city')?.value;
    // }
    // if (this.filterForm.get('region')?.value) {
    //   payload.region = this.filterForm.get('region')?.value;
    // }

    // this.publicService.GetPartnerCities(payload).subscribe(cities => {
    //   this.loading.set(false);
    //   let d = this.citiesResponse() || [];
    //   let data = [...d, ...cities.data];
    //   this.citiesResponse.set(data);
    //   this.totalRecords.set(cities.totalRecords);
    //   this.currentPage.set(cities.pageNumber);
    //   this.pageSize.set(cities.pageSize);
    // });
  }
  GetPartnerCitiesFilterRecord() {
    this.publicService.GetPartnerCitiesFilterRecord().subscribe({
      next: (res) => {
        if (res.result) {
          this.filterData.set(res.result);
        }

      }
    });
  }
  GetAllPillarAsync() {
    this.publicService.GetAllPillarAsync().subscribe({
      next: (res) => {
        this.pillars = res.result || [];
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
    let url = '/auth/login?role=' + UserRoleValue.Admin;
    this.common.goToSubscriptionApp(url);
  }
  onCountryChange(selectedCountry: any) {
    if (selectedCountry) {
      //this.cities = selectedCountry.cities;
    }
  }
  onSearch(isSearch = false) {
    if (isSearch) {
      this.currentPage.set(0);
      this.citiesResponse.set(undefined);
    }
    this.loading.set(true);
    this.getCities();
  }
}

import { Component, inject, OnInit } from '@angular/core';
import { CommonService } from '../../core/services/common-service';
import { UserRoleValue } from '../../core/models/UserRole';
import { pillarsData } from '../../core/data/pillarData';
import { CommonModule } from '@angular/common';
import { countriesList } from '../../core/data/countriesList';
import { USACity } from '../../core/data/USACity';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-partner-city',
  imports: [CommonModule, NgSelectModule, ReactiveFormsModule],
  templateUrl: './partner-city.html',
  styleUrl: './partner-city.css'
})
export class PartnerCity implements OnInit {
  private common = inject(CommonService);
  pillars = pillarsData;
  cities: string[] = USACity;
  countries = countriesList;
  filterForm!: FormGroup;
  regions: string[] = ['North America', 'Europe', 'Asia', 'Australia', 'Africa', 'South America', 'Antarctica'];
  constructor(private fb: FormBuilder) { }
  ngOnInit(): void {
    this.filterForm = this.fb.group({
      country: [null],
      region: [],
      city: [null],
      pillar: []
    });
  }

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
  onCountryChange(selectedCountry: any) {
    if (selectedCountry) {
      this.cities = selectedCountry.cities;

    }
  }
  onSearch() {
    console.log('Form Value:', this.filterForm.value);
    // Implement your search/filter logic here
  }
}

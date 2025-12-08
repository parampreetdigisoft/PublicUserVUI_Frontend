import { Component, input, OnInit } from '@angular/core';
import { PartnerCityResponseDto } from '../../../../core/models/PartnerCityHistoryResponseDto';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-view-parter-city',
  imports: [],
  templateUrl: './view-parter-city.html',
  styleUrl: './view-parter-city.css'
})
export class ViewParterCity implements OnInit {

  cityDetail = input.required<PartnerCityResponseDto>();
  urlBase = environment.apiUrl;
  // Chart Options
  constructor() {
    
  }

  ngOnInit(): void {

  }

  onImgError(event: Event) {
    (event.target as HTMLImageElement).src = '../../../../Frame 1321315029.png';
  }
}


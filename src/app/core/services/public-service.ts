import { inject, Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { ResultResponseDto } from '../models/ResultResponseDto';
import { map } from 'rxjs';
import { CityVM } from '../models/CityVM';
import { PartnerCityRequest } from '../models/PaginationRequest';
import { PaginationResponse } from '../models/PaginationResponse';
import { PartnerCityResponseDto } from '../models/PartnerCityHistoryResponseDto';
import { PillarResponseDto } from '../models/PillarResponseDto';
import { PartnerCityFilterResponse } from '../models/PartnerCityFilterResponse';
import { CountryCityResponse } from '../models/CountryCityResponse';
import { PromotedPillarsResponseDto } from '../models/PromotedPillarsResponseDto';

@Injectable({
  providedIn: 'root'
})
export class PublicService {
  http = inject(HttpService);

  contactus(data: any) {
    return this.http.post('Auth/contactus', data).pipe(map((x) => x as ResultResponseDto<unknown>));
  }

  getAllCityByUserId() {
    return this.http.get('City/getAllCityByUserId').pipe(map((x) => x as ResultResponseDto<CityVM[]>));
  }
  GetPartnerCitiesFilterRecord() {
    return this.http.get('Public/GetPartnerCitiesFilterRecord').pipe(map((x) => x as ResultResponseDto<PartnerCityFilterResponse>));
  }
  GetAllPillarAsync() {
    return this.http.get('Public/GetAllPillarAsync').pipe(map((x) => x as ResultResponseDto<PillarResponseDto[]>));
  }
  GetPartnerCities(r: PartnerCityRequest) {
    return this.http.getWithQueryParams('Public/GetPartnerCities', r).pipe(map((x) => x as PaginationResponse<PartnerCityResponseDto>));
  }
  DownloadExecutiveSummeryPdf() {
     return this.http.ImportFile(`Public/DownloadExecutiveSummeryPdf`);
  }
  DownloadSummeryReportPdf() {
    return this.http.ImportFile('Public/DownloadSummeryReportPdf');
  }

  GetCountriesCities() {
    return this.http.get('Public/countries-cities').pipe(map((x) => x as CountryCityResponse));
  }
  
  GetPromotedCities() { 
    return this.http.get('Public/promoted-cities').pipe(map((x) => x as ResultResponseDto<PromotedPillarsResponseDto[]>));
  }
}

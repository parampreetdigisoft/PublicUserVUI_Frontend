import { inject, Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { ResultResponseDto } from '../models/ResultResponseDto';
import { map } from 'rxjs';
import { CityVM } from '../models/CityVM';

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
}

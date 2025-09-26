import { Injectable } from '@angular/core';
import { HttpService } from './http-service';
import { UserService } from './user-service';
import { BehaviorSubject, map } from 'rxjs';
import { IResultResponseDto } from '../interfaces/IResultResponseDto';
import { CityVM } from '../models/CityVM';

@Injectable({
  providedIn: 'root',
})
export class CommonService {
  private years = new BehaviorSubject<number[]>(this.getYearList(2025));

  constructor(private http: HttpService, private userService: UserService) {}

  public getAllCities() {
    return this.http
      .get(`CityUser/getAllCities`)
      .pipe(map((x) => x as IResultResponseDto<CityVM[]>));
  }
  get applicateYears() {
    return this.years.value;
  }
  getStartOfYearLocal(year: number): string {
    return `${year}-01-01T00:00:00`;
  }
  getYearList(startYear: number): number[] {
    const currentYear = new Date().getFullYear();
    const years: number[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      years.push(year);
    }
    return years;
  }
}

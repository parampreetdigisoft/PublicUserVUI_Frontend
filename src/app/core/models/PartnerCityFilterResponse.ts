// partner-city-filter-response.model.ts

export interface PartnerCityDto {
  cityID: number;
  cityName: string;
}

export interface PartnerCityFilterResponse {
  countries: string[];
  regions: string[];
  cities: PartnerCityDto[];
}

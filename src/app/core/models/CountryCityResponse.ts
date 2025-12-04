export interface CountryCityResponse {
  error: boolean;
  msg: string;
  data: CountryData[];
}

export interface CountryData {
  country: string;
  cities: string[];
}

export interface PartnerCityHistoryResponseDto {
  score: number;
  highScore: number;
  lowerScore: number;
  progress: number;
}

export interface PartnerCityResponseDto extends PartnerCityHistoryResponseDto {
  cityID: number;
  country: string;
  state: string;
  cityName: string;
  postalCode?: string;
  region?: string;
  image?: string;
}

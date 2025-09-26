export interface CityVM extends PublicViewCityDto {
  isActive: boolean;
  createdDate: string;   // ISO date string from backend
  updatedDate?: string | null;
  isDeleted: boolean;
  assignedBy?: string;
  userCityMappingID?:number;
  score?: number;
}
export interface PublicViewCityDto{
  cityID: number;
  state: string;
  cityName: string;
  postalCode: string;
  region: string;
}


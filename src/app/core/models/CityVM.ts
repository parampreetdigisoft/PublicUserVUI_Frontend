import { TieredAccessPlanValue } from "./TieredAccessPlan";

export interface CityVM extends AddUpdateCityDto {
  isActive: boolean;
  createdDate: string;   // ISO date string from backend
  updatedDate?: string | null;
  isDeleted: boolean;
  assignedBy?: string;
  userCityMappingID?:number;
  score?: number;
}
export interface AddUpdateCityDto {
  cityID: number;
  country: string;
  state: string;
  cityName: string;
  postalCode: string;
  region: string;
  image: string;
}


export interface IPlan {
  name:string,
  tier:TieredAccessPlanValue,
  amount:number
} 
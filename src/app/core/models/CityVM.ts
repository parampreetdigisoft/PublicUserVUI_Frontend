import { TieredAccessPlanValue } from "./TieredAccessPlan";

export interface CityVMDetails {
  isActive: boolean;
  createdDate: string;   // ISO date string from backend
  updatedDate?: string | null;
  isDeleted: boolean;
  assignedBy?: string;
  userCityMappingID?:number;
}

export interface IPlan {
  name:string,
  tier:TieredAccessPlanValue,
  amount:number
} 

export interface CityVM {
  cityID: number;
  country: string;
  state: string;
  cityName: string;
  postalCode: string;
  region: string;
  image: string;
  scoreProgress?: number;
  description: string;
  rank: number;

}
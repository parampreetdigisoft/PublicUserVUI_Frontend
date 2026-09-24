import { TieredAccessPlanValue } from "../enums/TieredAccessPlan";

export interface IUserInfo extends PublicUserResponse {
  isActive: number;
  tokenExpirationDate: string;
  profileImagePath: string;
  token: string;
  rememberMe:boolean;
  tier:TieredAccessPlanValue
}
export interface PublicUserResponse {
  userID: number;
  fullName: string;
  email: string;
  phone?: string | null;
  isDeleted: boolean;
  role: string;
  createdBy?: number | null;
  createdByName?: string | null;
  createdAt: string; // or Date if you plan to convert to Date object
  isEmailConfirmed: boolean;
  isLoggedIn: boolean;
}
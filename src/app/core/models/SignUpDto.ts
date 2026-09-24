import { UserRoleValue } from "../enums/UserRole";

export interface CityUserSignUpDto extends LoginRequestDto{
  fullName: string;
  phone: string;
  cityID: number;
  role: UserRoleValue;
}
export interface LoginRequestDto
{
  email: string;
  password: string;
}

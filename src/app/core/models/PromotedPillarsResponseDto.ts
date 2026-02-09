import { CityVM } from "./CityVM";

export interface PromotedPillarsResponseDto {
  pillarID: number;
  pillarName: string;
  displayOrder: number;
  imagePath: string;
  cities: CityVM[];
}

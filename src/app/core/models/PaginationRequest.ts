export interface PaginationRequest {
  pageNumber?: number;      // defaults to 1 if not provided
  pageSize?: number;        // defaults to 10 if not provided, max 200
  sortBy?: string | null;
  sortDirection?: 'asc' | 'desc'; // restrict to allowed values
  searchText?: string | null;
}


export interface PartnerCityRequest extends PaginationRequest{
  country?:string | null;
  cityID?:string | null;
  region?:string | null;
  pillarID?:number | null;
}

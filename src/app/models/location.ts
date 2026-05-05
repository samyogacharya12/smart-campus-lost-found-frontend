export interface ApiResponse<T> {
  message: string;
  status: string;
  detail: T;
  responseStatus: string;
}

export interface LocationDto {
  locationId?: number;
  locationName?: string;
  locationDescription ?: string;
}

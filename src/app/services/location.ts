import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpHeaders} from '@angular/common/http';
import {ApiResponse, LocationDto} from '../models/location'
export interface LocationRequest {
  locationName: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class LocationService {

  private apiUrl = 'http://localhost:8080/api/location';

  constructor(private http: HttpClient) {}

createLocation(location: LocationRequest): Observable<any> {
     const token = localStorage.getItem('token');

  console.log('Token:', token);

  const headers = new HttpHeaders({
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json'
  });

 console.log('Authorization:', headers.get('Authorization'));
 console.log('Content-Type:', headers.get('Content-Type'));

  return this.http.post<any>(
    'http://localhost:8080/api/location',
    location,
    { headers }
  );
}

  getAllLocations(): Observable<any[]> {
        const token = localStorage.getItem('token'); // or wherever you store it
  const headers = new HttpHeaders({
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  });
    return this.http.get<any[]>(this.apiUrl, {headers});
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Claim } from '../models/claim';

@Injectable({
  providedIn: 'root'
})
export class ClaimService {

  private apiUrl = 'http://localhost:8080/api/claims';
    private uploadApiUrl = 'http://localhost:8080/item/claim';


  constructor(private http: HttpClient) {}

  createClaim(claim: any): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    return this.http.post(this.uploadApiUrl+'/upload', claim, { headers });
  }

  getAllClaims(): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(this.apiUrl, { headers });
  }

  getAllClaimsByUsers(): Observable<any[]> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.get<any[]>(`${this.apiUrl}/user`, { headers });
  }

  updateClaim(id: number, claim: Claim): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/${id}`, claim, { headers });
  }

  deleteClaim(id: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${this.apiUrl}/${id}`, { headers });
  }

  approveClaim(claimId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/${claimId}/approve`, {}, { headers });
  }

  rejectClaim(claimId: number): Observable<any> {
    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });

    return this.http.put(`${this.apiUrl}/${claimId}/reject`, {}, { headers });
  }
}
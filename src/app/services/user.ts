import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // GET ALL USERS
  getAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(
      this.apiUrl,
      { headers: this.getHeaders() }
    );
  }

  // CREATE USER
  createUser(user: any): Observable<any> {
    return this.http.post(
      this.apiUrl,
      user,
      { headers: this.getHeaders() }
    );
  }

  // UPDATE USER
  updateUser(user: any): Observable<any> {
    return this.http.put(
      `${this.apiUrl}`,
      user,
      { headers: this.getHeaders() }
    );
  }

  // DELETE USER
  deleteUser(id: number): Observable<any> {
    return this.http.delete(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }

  // GET USER BY ID
  getUserById(id: number): Observable<any> {
    return this.http.get(
      `${this.apiUrl}/${id}`,
      { headers: this.getHeaders() }
    );
  }
}
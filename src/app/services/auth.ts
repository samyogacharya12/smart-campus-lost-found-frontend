import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api';
  private isBrowser: boolean;

  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);

    if (this.isBrowser) {
      this.loggedIn.next(this.hasToken());
    }
  }

  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/authenticate`, credentials).pipe(
      tap((response: any) => {
        if (this.isBrowser) {
          localStorage.setItem('username', credentials.userName);
          localStorage.setItem('token', response.detail.token);
          localStorage.setItem('role', response.detail.roles); 
          localStorage.setItem('reload', 'true');
        }

        this.loggedIn.next(true);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.loggedIn.value;
  }

  private hasToken(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    return !!localStorage.getItem('token');
  }

  getUsername(): string {
    if (!this.isBrowser) {
      return '';
    }

    return localStorage.getItem('username') || '';
  }

  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('reload');
    }

    this.loggedIn.next(false);
  }
}
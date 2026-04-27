import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8080/api/authenticate';
  private isBrowser: boolean;

  private loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
    this.loggedIn.next(this.hasToken());
  }

  login(credentials: { userName: string; password: string }): Observable<any> {
    return this.http.post<any>(this.apiUrl, credentials).pipe(
      tap((response: any) => {
        console.log('Login response:', response);

        if (this.isBrowser) {
          localStorage.setItem('username', credentials.userName);

          // adjust this based on your backend response
          const token = response?.detail?.token || response?.token;

          if (token) {
            localStorage.setItem('token', token);
          }

          localStorage.setItem('reload', 'true');
        }

        this.loggedIn.next(true);
      })
    );
  }

  private hasToken(): boolean {
    if (!this.isBrowser) {
      return false;
    }

    return !!localStorage.getItem('token');
  }
}
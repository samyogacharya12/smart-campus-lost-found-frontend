import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Navbar } from './components/navbar/navbar';

import { AuthService } from './services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar],
  standalone: true, // ✅ REQUIRED
  imports: [ 
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatButtonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css'] // ✅ FIXED
})
export class App {
  isLoggedIn: boolean = false;
  username: string = '';

  protected readonly title = signal('smart-campus-lost-found-frontend');
}

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
    console.log('User logged in status:', this.isLoggedIn);

    if (this.isLoggedIn) {
      this.username = this.authService.getUsername();
      console.log('Logged in username:', this.username);
    }
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigate(['/']);
  }
}
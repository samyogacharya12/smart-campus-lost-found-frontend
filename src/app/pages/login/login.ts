import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
@Component({
  selector: 'app-login',
  imports: [FormsModule,CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {

 userName = '';
 password = '';
 errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

 login() {
    this.authService.login({ userName: this.userName, password: this.password }).subscribe({
      next: () => {
        alert('Login successful!');
        this.router.navigate(['/dashboard']);
      },
      error: () => {
        alert('Invalid credentials.');
      }
    });
  }





}

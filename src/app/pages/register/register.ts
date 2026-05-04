import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],  // 👈 THIS LINE IS IMPORTANT
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
 userName = '';
  email = '';
  password = '';
  firstName = '';
  lastName = '';
  phoneNumber = '';
  address = '';
  roles = 'USER';

  errorMessage = '';

  constructor(private authService: AuthService) {}

  register() {
    const payload = {
      userName: this.userName,
      email: this.email,
      password: this.password,
      firstName: this.firstName,
      lastName: this.lastName,
      phoneNumber: this.phoneNumber,
      address: this.address,
      roles: this.roles
    };
     console.log("the api is called");
    this.authService.register(payload).subscribe({
      next: (res) => {
        alert('Registration successful');
      },
      error: (err) => {
        this.errorMessage = 'Registration failed';
      }
    });
  }

}

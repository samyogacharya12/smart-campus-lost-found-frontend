import { Component } from '@angular/core';
import { AuthService } from '../../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';

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
  successMessage = '';
  errorMessage = '';

  constructor(private authService: AuthService,
                  private cdr: ChangeDetectorRef
  ) {}

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
           this.successMessage = '🎉 Registration completed successfully!';
           console.log(this.successMessage);
        this.errorMessage = '';

        // Reset form fields
        this.userName = '';
        this.email = '';
        this.password = '';
        this.firstName = '';
        this.lastName = '';
        this.phoneNumber = '';
        this.address = '';
        this.roles = 'USER';
        this.cdr.detectChanges(); // force UI update
      },
      error: (err) => {
        this.successMessage = '';
        this.errorMessage = 'Registration failed';
        console.log(this.errorMessage);
      }
    });
  }

}

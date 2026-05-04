import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  // Tracks which tab the user has selected
  selectedRole: 'student' | 'admin' = 'student';

  // They don't do anything yet  (waiting for back-end)
  email: string = '';
  password: string = '';

  // Tracks whether the user has clicked Sign In 
  submitted: boolean = false;

  // Switches the role toggle
  setRole(role: 'student' | 'admin'): void {
    this.selectedRole = role;
    // Reset form state when switching roles
    this.submitted = false;
  }

  // Called when the Sign In button is clicked

  onSignIn(): void {
    this.submitted = true;

    // Basic front-end check — fields must not be empty
    if (!this.email || !this.password) {
      return; // stops here, template will show the error hints
    }

    
    console.log('Sign in attempted:', {
      role: this.selectedRole,
      email: this.email,
      
    });

  }

  // Called when "Forgot password?" is clicked
  onForgotPassword(): void {
    console.log('Forgot password clicked');
  }

  // Called when "Register here" is clicked
  onRegister(): void {
    console.log('Navigate to register');
  }
}
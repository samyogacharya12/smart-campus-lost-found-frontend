import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink,CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {

  isLoggedIn = false;
  isAdmin = false;
  isUser = false;
  username = '';
  role = '';
  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.isLoggedIn = this.authService.isLoggedIn();
    this.role = localStorage.getItem('role') || '';
    this.username = this.authService.getUsername();

       if(this.role==='USER'){
        this.isUser=true;
   } else if(this.role==='ADMIN'){
       this.isAdmin=true;
   }
  }

  logout() {
    this.authService.logout();
    window.location.reload(); // or router.navigate(['/login'])
  }

}
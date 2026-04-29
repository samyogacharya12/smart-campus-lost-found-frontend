import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';


@Component({
  selector: 'app-dashboard',
    imports: [ 
    CommonModule,
    RouterOutlet,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    MatCardModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
    role = '';
    isUser:boolean=false;
    isAdmin:boolean=false;
  isLoggedIn: boolean = false;
  username?: string = '';

    constructor(private authService: AuthService) {}
 ngOnInit(): void {
      this.isLoggedIn = this.authService.isLoggedIn();
      this.role = localStorage.getItem('role') || '';
     if (localStorage.getItem('reload') === "true") {
    console.log("reloading");
     localStorage.setItem('reload', "false");
     window.location.reload();
   }  else {
        console.log("stopping reload");
       localStorage.removeItem('reload' +  this.role);
   }  
   if(this.role==='USER'){
        this.isUser=true;
   } else if(this.role==='ADMIN'){
       this.isAdmin=true;
   }
         console.log(" role " +this.role);
         console.log(" admin " +this.isAdmin);
         console.log(" user " +this.isUser);

}


}

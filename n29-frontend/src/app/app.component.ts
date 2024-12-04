import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './auth.service';  // Import the AuthService

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent], // Import necessary modules
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'n29-frontend';

  constructor(private router: Router, private authService: AuthService) {}

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  // Logout function to remove JWT token and redirect to login
  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page after logout
  }
}



// import { Component } from '@angular/core';
// import { NavComponent } from './nav/nav.component'; // Import the NavComponent

// @Component({
//   selector: 'app-root',
//   standalone: true,
//   imports: [NavComponent],  // Add NavComponent to the imports array
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.css']
// })
// export class AppComponent {
//   title = 'n29';
// }

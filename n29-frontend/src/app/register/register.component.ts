// import { Component } from '@angular/core';

// @Component({
//   selector: 'app-register',
//   standalone: true,
//   imports: [],
//   templateUrl: './register.component.html',
//   styleUrl: './register.component.css'
// })
// export class RegisterComponent {

// }


import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username = '';
  password = '';
  errorMessage = ''; // Error message for failed registration
  successMessage = ''; // Success message for successful registration

  constructor(private http: HttpClient, private router: Router) {}

  register() {
    const user = { username: this.username, password: this.password };

    this.http.post('api/register', user).subscribe(
      () => {
        this.successMessage = 'Registration successful! You can now log in.';
        this.errorMessage = '';
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error) => {
        this.errorMessage = error.error.message || 'Registration failed. Please try again.';
        this.successMessage = '';
        console.error('Error during registration:', error);
      }
    );
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, HttpClientModule, RouterModule ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = ''; // Input username
  password = ''; // Input password
  errorMessage = ''; // Error message to display in case of login failure

  constructor(private http: HttpClient, private router: Router) {}

  login() {
    // API call to the backend for user authentication
    const user = { username: this.username, password: this.password };

    this.http.post<{ token: string }>('api/login', user).subscribe(
      (response) => {
        // Store the token in localStorage
        localStorage.setItem('token', response.token);

        // Redirect to the dashboard
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Display an error message on login failure
        this.errorMessage = 'Invalid username or password';
        console.error('Login error:', error);
      }
    );
  }
}

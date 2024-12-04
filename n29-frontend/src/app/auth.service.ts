// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {

//   constructor() { }
// }




// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthService {
//   constructor() {}

//   // Check if the user is logged in (check if token exists)
//   isLoggedIn(): boolean {
//     return localStorage.getItem('token') !== null;
//   }

//   // Login method to set a dummy token
//   login(username: string, password: string): boolean {
//     if (username === 'nitish' && password === 'nitish') {
//       localStorage.setItem('token', 'dummy-token');  // Set token in localStorage
//       return true;
//     }
//     return false;
//   }

//   // Logout method to clear token
//   logout(): void {
//     localStorage.removeItem('token');
//   }
// }




import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Check if the application is running in the browser environment
  private isBrowser() {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }

  // Check if the user is logged in by looking for a token in localStorage
  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return !!localStorage.getItem('token');  // Return true if token exists
    }
    return false;  // Default to false if not in the browser environment
  }

  // Login function: store token in localStorage
  login(token: string) {
    if (this.isBrowser()) {
      localStorage.setItem('token', token);
    }
  }

  // Logout function: remove token from localStorage
  logout() {
    if (this.isBrowser()) {
      localStorage.removeItem('token');
    }
  }
}


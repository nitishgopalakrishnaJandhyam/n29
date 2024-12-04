// import { CanActivateFn } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   return true;
// };


// import { Injectable } from '@angular/core';
// import { CanActivate, Router } from '@angular/router';
// import { Observable } from 'rxjs';

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate {
//   constructor(private router: Router) {}

//   canActivate(): Observable<boolean> | Promise<boolean> | boolean {
//     const token = localStorage.getItem('token');
//     if (token) {
//       // If token exists, allow access to the route
//       return true;
//     } else {
//       // Otherwise, redirect to login page
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }


// import { inject } from '@angular/core';
// import { Router } from '@angular/router';
// import { CanActivateFn } from '@angular/router';

// // Create the canActivateFn guard function
// export const authGuard: CanActivateFn = () => {
//   const router = inject(Router);
//   const token = localStorage.getItem('token');

//   if (token) {
//     // If token exists, allow access
//     return true;
//   } else {
//     // Redirect to login if no token
//     router.navigate(['/login']);
//     return false;
//   }
// };


import { Injectable, inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  if (typeof window !== 'undefined' && localStorage.getItem('token')) {
    // Check if token exists in localStorage
    return true;
  }

  // Redirect to login page if not authenticated
  const router = inject(Router);
  router.navigate(['/login']);
  return false;
};

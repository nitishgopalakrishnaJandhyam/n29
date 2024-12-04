// import { Routes } from '@angular/router';

// export const routes: Routes = [];


// import { Routes } from '@angular/router';
// import { LoginComponent } from './login/login.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { SummaryComponent } from './summary/summary.component';
// import { ReportsComponent } from './reports/reports.component';

// export const appRoutes: Routes = [
//   { path: '', redirectTo: '/login', pathMatch: 'full' },
//   { path: 'login', component: LoginComponent },
//   { path: 'dashboard', component: DashboardComponent },
//   { path: 'summary', component: SummaryComponent },
//   { path: 'reports', component: ReportsComponent }
// ];


import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SummaryComponent } from './summary/summary.component';
import { ReportsComponent } from './reports/reports.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';
import { authGuard } from './auth.guard'; // Import the guard function

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'dashboard', component: DashboardComponent, canActivate: [authGuard] },  // Use the new guard function
  { path: 'summary', component: SummaryComponent, canActivate: [authGuard] },       // Use the new guard function
  { path: 'reports', component: ReportsComponent, canActivate: [authGuard] }        // Use the new guard function
];

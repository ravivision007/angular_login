// dashboard-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { authGuard } from '../auth.guard';

const dashboardRoutes: Routes = [
  { 
    path: '', 
    component: HomeComponent,
    canActivate: [authGuard]
  },
  // Add other routes within the dashboard module here
];

@NgModule({
  imports: [RouterModule.forChild(dashboardRoutes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }

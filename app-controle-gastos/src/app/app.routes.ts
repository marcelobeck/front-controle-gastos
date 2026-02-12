import { Routes } from '@angular/router';
import { LoginComponent } from './usuario/componentes/login/login.component';
import { ExpenseNavHeaderComponent } from './expense-nav-header/expense-nav-header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GastosFixosComponent } from './gastos-fixos/gastos-fixos.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },

  {
    path: 'dashboard',
    component: ExpenseNavHeaderComponent,
    children: [
      { path: '',             redirectTo: 'home', pathMatch: 'full' },
      { path: 'home',         component: DashboardComponent },
      { path: 'gastos-fixos', component: GastosFixosComponent },
    ]
  },

  { path: '', redirectTo: '/login', pathMatch: 'full' }
];
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'expense-nav-header',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './expense-nav-header.component.html',
  styleUrls: ['./expense-nav-header.component.scss']
})
export class ExpenseNavHeaderComponent {

  userEmail: string = 'joao.silva@email.com';

  constructor(private router: Router) {}

  // Lê a URL atual para saber qual tab está ativa
  get currentView(): string {
    const url = this.router.url;
    if (url.includes('gastos-fixos')) return 'gastos-fixos';
    if (url.includes('transacoes'))   return 'transacoes';
    return 'dashboard';
  }

  navigateTo(route: string): void {
    if (route === 'dashboard') {
      this.router.navigate(['/dashboard/home']);
    } else {
      this.router.navigate(['/dashboard', route]);
    }
  }

  onClose(): void {
    console.log('Fechar modal');
  }

  onLogout(): void {
    this.router.navigate(['/login']);
  }
}
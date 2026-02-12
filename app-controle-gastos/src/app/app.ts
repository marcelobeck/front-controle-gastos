import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './usuario/componentes/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('app-controle-gastos');
}

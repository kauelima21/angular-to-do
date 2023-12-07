import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink],
  template: `
    <header class="flex items-center justify-between p-10 bg-gray-700">
      <img
        routerLink="tasks"
        src="assets/img/Logo.svg"
        class="cursor-pointer"
      />
      <ul>
        <li>
          <a
            routerLink="login"
            class="flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 bg-gray-500 text-gray-100 hover:bg-gray-400"
          >
            Entrar
            <i class="ph ph-sign-in"></i>
          </a>
        </li>
      </ul>
    </header>
    <main>
      <router-outlet />
    </main>
  `,
})
export class AppComponent {
  title = 'ToDo';
}

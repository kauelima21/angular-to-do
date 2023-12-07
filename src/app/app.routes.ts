import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'tasks',
    loadComponent: () => import('./tasks/tasks.component')
      .then(c => c.TasksComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login.component')
      .then(c => c.LoginComponent),
  },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
];

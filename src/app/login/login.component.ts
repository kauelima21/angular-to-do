import { Component } from '@angular/core';
import { LoginFormComponent } from './ui/login-form/login-form.component';
import { RegisterFormComponent } from './ui/register-form/register-form.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [LoginFormComponent, RegisterFormComponent],
  template: `
    <div class="flex justify-center py-10">
      @if (formMode == "login") {
        <app-login-form
          (loginSubmitted)="showData($event)"
          (changeMode)="switchMode($event)"
        />
      } @else {
        <app-register-form
          (registerSubmitted)="showData($event)"
          (changeMode)="switchMode($event)"
        />
      }
    </div>
  `,
  styles: ``
})
export class LoginComponent {
  public formMode: 'login' | 'register' = 'login';

  public switchMode(formMode: 'login' | 'register'): void {
    if (this.formMode == formMode) {
      return;
    }

    this.formMode = formMode;
  }

  public showData(event: any): void {
    console.log(event)
  }
}

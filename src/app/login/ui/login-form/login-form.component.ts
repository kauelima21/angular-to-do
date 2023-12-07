import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="loginForm"
      (ngSubmit)="sendData()"
      class="flex flex-col gap-3 w-[420px]"
    >
      <h2 class="text-2xl text-gray-100">Faça login na plataforma</h2>
      <input
        type="text"
        placeholder="Email"
        formControlName="email"
        class="bg-gray-500 rounded-lg p-4 text-gray-100 border border-gray-500 focus:border-purple-dark outline-none"
      />
      <input
        type="password"
        placeholder="Senha"
        formControlName="password"
        class="bg-gray-500 rounded-lg p-4 text-gray-100 border border-gray-500 focus:border-purple-dark outline-none"
      />
      <button
        [disabled]="!loginForm.valid"
        class="flex items-center justify-center gap-2 bg-blue-dark transition-all duration-300 p-4 rounded-lg text-gray-100 hover:bg-blue"
      >
        <span class="text-sm">Entrar</span>
      </button>
      <p class="text-gray-200">
        Não possui cadastro?
        <span
          class="text-purple cursor-pointer"
          (click)="changeMode.emit('register')"
        >
          Clique aqui
        </span>
      </p>
    </form>
  `,
  styles: ``
})
export class LoginFormComponent {
  @Output() loginSubmitted = new EventEmitter();
  @Output() changeMode = new EventEmitter<'register'>();

  private fb = inject(FormBuilder);

  public loginForm = this.fb.nonNullable.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
  });

  public sendData(): void {
    this.loginSubmitted.emit(this.loginForm.getRawValue());
    this.loginForm.reset();
  }
}

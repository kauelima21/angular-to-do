import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="registerForm"
      (ngSubmit)="sendData()"
      class="flex flex-col gap-3 w-[420px]"
    >
      <h2 class="text-2xl text-gray-100">Crie sua conta</h2>
      <input
        type="text"
        placeholder="Nome de usuário"
        formControlName="username"
        class="bg-gray-500 rounded-lg p-4 text-gray-100 border border-gray-500 focus:border-purple-dark outline-none"
      />
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
      <input
        type="password"
        placeholder="Confirmar Senha"
        formControlName="password_confirm"
        class="bg-gray-500 rounded-lg p-4 text-gray-100 border border-gray-500 focus:border-purple-dark outline-none"
      />
      <button
        [disabled]="!registerForm.valid"
        class="flex items-center justify-center gap-2 bg-blue-dark transition-all duration-300 p-4 rounded-lg text-gray-100 hover:bg-blue"
      >
        <span class="text-sm">Entrar</span>
      </button>
      <p class="text-gray-200">
        Já possui cadastro?
        <span
          class="text-purple cursor-pointer"
          (click)="changeMode.emit('login')"
        >
          Clique aqui
        </span>
      </p>
    </form>
  `,
  styles: ``
})
export class RegisterFormComponent {
  @Output() registerSubmitted = new EventEmitter();
  @Output() changeMode = new EventEmitter<'login'>();

  private fb = inject(FormBuilder);

  public registerForm = this.fb.nonNullable.group({
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    password_confirm: ['', [Validators.required, Validators.minLength(8)]],
  });

  public sendData(): void {
    this.registerSubmitted.emit(this.registerForm.getRawValue());
    this.registerForm.reset();
  }
}

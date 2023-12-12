import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Task } from '../../interfaces/tasks';

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  template: `
    <form
      [formGroup]="taskForm"
      (ngSubmit)="sendData()"
      class="flex gap-2 w-[736px]"
    >
      <input
        type="text"
        placeholder="Adicione uma nova tarefa"
        formControlName="title"
        class="w-full bg-gray-500 rounded-lg p-4 text-gray-100 border border-gray-500 focus:border-purple-dark outline-none"
      />
      <button
        [disabled]="!taskForm.valid"
        type="submit"
        class="flex items-center gap-2 cursor-pointer bg-blue-dark transition-all duration-300 p-4 rounded-lg text-gray-100 hover:bg-blue"
      >
        <span class="text-sm">Criar</span>
        <i class="ph ph-plus-circle"></i>
      </button>
    </form>
  `,
  styles: ``
})
export class AddTaskComponent {
  @Output() taskSubmitted = new EventEmitter<Task>();

  private fb = inject(FormBuilder);

  public taskForm = this.fb.nonNullable.group({
    title: ['', Validators.required],
    user_id: 'my-user',
  });

  public sendData(): void {
    this.taskSubmitted.emit(this.taskForm.getRawValue());
    this.taskForm.reset();
  }
}

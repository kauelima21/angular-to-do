import { Component, EventEmitter, Input, Output, computed, signal } from '@angular/core';
import { Task } from '../../interfaces/tasks';
import { TaskItemComponent } from '../task-item/task-item.component';

@Component({
  selector: 'app-list-task',
  standalone: true,
  imports: [TaskItemComponent],
  template: `
    <div class="flex flex-col gap-6 w-[736px]">
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2 text-sm">
          <p class="text-blue">Tarefas criadas</p>
          <span class="rounded-full py-0.5 px-2 bg-gray-400 text-gray-100">
            {{ totalTasksCount }}
          </span>
        </div>
        <div class="flex items-center gap-2 text-sm">
          <p class="text-purple">Concluídas</p>
          <span class="rounded-full py-0.5 px-2 bg-gray-400 text-gray-100">
            {{ completedTasksCount }} de {{ totalTasksCount }}
          </span>
        </div>
      </div>
      @for (task of tasks; track task.id) {
        <app-task-item
          [task]="task"
          (taskCompleted)="completeTask($event)"
          (taskRemoved)="removeTask($event)"
        />
      } @empty {
        <div class="flex flex-col items-center p-16 gap-4 border-t border-[#333] rounded-lg">
          <img src="assets/img/Clipboard.svg" />
          <div>
            <p class="text-gray-300"><b>Você ainda não tem tarefas cadastradas</b></p>
            <p class="text-gray-300">Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      }
    </div>
  `,
  styles: ``
})
export class ListTaskComponent {
  @Input({ required: true }) public tasks!: Task[];
  @Input() public totalTasksCount!: number;
  @Input() public completedTasksCount!: number;
  @Output() public taskCompleted = new EventEmitter<Task>();
  @Output() public taskRemoved = new EventEmitter<Task>();

  public completeTask(task: Task) {
    this.taskCompleted.emit(task);
  }

  public removeTask(task: Task) {
    this.taskRemoved.emit(task);
  }
}

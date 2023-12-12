import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Task } from '../../interfaces/tasks';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [],
  template: `
    @if (completed) {
      <div
        (click)="completeTask($event)"
        class="flex items-center gap-3 cursor-pointer border border-gray-400 bg-gray-400 rounded-lg p-4"
      >
        <div class="grid place-items-center text-xs rounded-full border-2 h-6 w-6 border-purple bg-purple hover:border-purple-dark hover:bg-purple-dark">
          <i class="ph ph-check text-gray-100"></i>
        </div>
        <p class="text-sm text-gray-100 basis-full line-through">{{ task.title }}</p>
        <i
          data-mode="delete"
          (click)="removeTask()"
          class="ph ph-trash text-gray-300 text-lg cursor:pointer hover:text-danger hover:bg-gray-400 rounded px-1"
        ></i>
      </div>
    } @else {
      <div
        (click)="completeTask($event)"
        class="flex items-center gap-3 cursor-pointer border border-gray-400 bg-gray-500 rounded-lg p-4"
      >
        <div class="grid place-items-center text-xs rounded-full border-2 h-6 w-6 border-blue hover:border-blue-dark"></div>
        <p class="text-sm text-gray-100 basis-full">{{ task.title }}</p>
        <i
          data-mode="delete"
          (click)="removeTask()"
          class="ph ph-trash text-gray-300 text-lg cursor:pointer hover:text-danger hover:bg-gray-400 rounded px-1"
        ></i>
      </div>
    }
  `,
  styles: ``
})
export class TaskItemComponent implements OnInit {
  @Input({ required: true }) public task!: Task;
  @Output() public taskCompleted = new EventEmitter<Task>();
  @Output() public taskRemoved = new EventEmitter<Task>();

  public completed: boolean = false;

  public ngOnInit(): void { 
    this.completed = this.task?.completed_at ? true : false;
  }

  public completeTask(event: any): void {
    if (event.target.dataset && event.target.dataset.mode == 'delete') {
      return
    }
    this.taskCompleted.emit(this.task);
    this.completed = !this.completed;
  }

  public removeTask(): void {
    this.taskRemoved.emit(this.task);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { ListTaskComponent } from './ui/list-task/list-task.component';
import { TasksService } from './data-access/tasks.service';
import { Task } from './interfaces/tasks';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AddTaskComponent, ListTaskComponent],
  template: `
    <div class="flex flex-col items-center py-10 gap-16">
      <app-add-task (taskSubmitted)="addTask($event)" />
      <app-list-task
        [tasks]="tasks"
        [totalTasksCount]="tasks.length"
        [completedTasksCount]="getCompletedTasksCount(tasks)"
        (taskCompleted)="completeTask($event)"
        (taskRemoved)="removeTask($event)"
      />
    </div>
  `,
})
export class TasksComponent implements OnInit {
  private tasksService = inject(TasksService);
  public tasks: Task[] = [];

  public ngOnInit(): void {
    this.getTasks();
  }

  public addTask(task: Task): void {
    this.tasksService.addTask(task);
    this.orderCompletedTasks();
  }

  public getTasks() {
    this.tasks = this.tasksService.tasks();
    this.orderCompletedTasks();
  }

  public completeTask(task: Task) {
    if (task?.completed_at) {
      this.tasksService.unCompleteTask(task);
    } else {
      this.tasksService.completeTask(task);
    }
    this.orderCompletedTasks();
  }

  public removeTask(task: Task) {
    this.tasksService.removeTask(task);
    this.orderCompletedTasks();
  }

  public orderCompletedTasks(): void {
    this.tasks.sort(
      (currentTask, nextTask) => {
        if (!currentTask?.completed_at && nextTask?.completed_at) {
          return -1;
        }
        if (currentTask?.completed_at && !nextTask?.completed_at) {
          return 1;
        }
        return 0;
      }
    );
  }

  public getCompletedTasksCount(tasks: Task[]): number {
    let completedTasks = tasks.filter(
      task => task?.completed_at
    );
    return completedTasks.length;
  }
}

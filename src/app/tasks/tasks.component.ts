import { Component } from '@angular/core';
import { AddTaskComponent } from './ui/add-task/add-task.component';
import { ListTaskComponent } from './ui/list-task/list-task.component';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [AddTaskComponent, ListTaskComponent],
  template: `
    <div class="flex flex-col items-center py-10 gap-16">
      <app-add-task (taskSubmitted)="showData($event)" />
      <app-list-task />
    </div>
  `,
})
export class TasksComponent {
  public showData(event: any) {
    console.log("Form Data -> ", event);
  }
}

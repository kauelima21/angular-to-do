import { Injectable, inject, signal } from '@angular/core';
import { Task } from '../interfaces/tasks';

@Injectable({
  providedIn: 'root'
})
export class TasksService {
  // # create a private property
  #tasks = signal<Task[]>([
    {
      created_at: '1702334538172',
      id: '323f040e-03f0-400b-801f-85b2641a41k5',
      title: 'Integer urna interdum massa libero auctor neque turpis turpis semper. Duis vel sed fames integer.',
      updated_at: '1702334538172',
      completed_at: '1702334538172',
      user_id: 'my-user',
    },
    {
      created_at: '1702334538172',
      id: '323f040e-03f0-400b-801f-85b2641a41b7',
      title: 'Outra Task pra ficar legal.',
      updated_at: '1702334538172',
      user_id: 'my-user',
    },
  ]);

  public tasks = this.#tasks.asReadonly();

  public addTask(task: Task): void {
    this.#tasks.update(
      tasks => {
        tasks.unshift(this.createNewTaskObjet(task))
        return tasks;
      }
    )
  }

  public removeTask(taskToRemove: Task): void {
    this.#tasks.update(tasks => {
      let taskIndex = tasks.findIndex((task) => task?.id == taskToRemove?.id);

      tasks.splice(taskIndex, 1);

      return tasks;
    });
  }

  public completeTask(taskToComplete: Task): void {
    this.#tasks.update(tasks => {
      let taskIndex = tasks.findIndex((task) => task?.id == taskToComplete?.id);

      tasks[taskIndex]['completed_at'] = Date.now().toString();

      return tasks;
    });
  }

  public unCompleteTask(taskToUnComplete: Task): void {
    this.#tasks.update(tasks => {
      let taskIndex = tasks.findIndex((task) => task?.id == taskToUnComplete?.id);

      delete tasks[taskIndex].completed_at;

      return tasks;
    });
  }

  // just for now, it will die when uses a real api
  public createNewTaskObjet(task: Task): Task {
    return {
      id: crypto.randomUUID(),
      title: task.title,
      user_id: task.user_id,
      created_at: Date.now().toString(),
      updated_at: Date.now().toString(),
    }
  }
}

import { Component, computed, DestroyRef, inject, input, OnInit, signal } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, CommonModule, RouterLink],
})
export class TasksComponent implements OnInit{
  // cach 1 dung input de sap xep
  // order = input<'asc' | 'desc'>();
  // userId = input.required<string>();
  // private tasksService = inject(TasksService);
  // userTasks = computed(() => {
  //   console.log(this.tasksService.allTasks());
  //   return this.tasksService.allTasks().filter(task => task.userId === this.userId());
  // });
  // hasTasks(): boolean {
  //   return this.userTasks().length > 0;
  // }

  //cach 2 dung observable
  // order?: 'asc' | 'desc';
  order = signal<'asc' | 'desc'>('asc');
  userId = input.required<string>();
  private tasksService = inject(TasksService);
  userTasks = computed(() => {
    console.log(this.tasksService.allTasks());
    return this.tasksService.allTasks().filter(task => task.userId === this.userId())
    .sort((a, b) => {
      if (this.order() === 'desc') {
          return b.title.localeCompare(a.title); // Sắp xếp giảm dần theo title
      } else {
          return a.title.localeCompare(b.title); // Sắp xếp tăng dần theo title
      }
  });
  });
  hasTasks(): boolean {
    return this.userTasks().length > 0;
  }
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);
  ngOnInit(): void {
      const subscription = this.activatedRoute.queryParams.subscribe({
        next: (params) => (this.order.set(params['order']))
      });
      this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }
}

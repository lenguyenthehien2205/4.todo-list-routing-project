import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);
  private tasksService = inject(TasksService);

  ngOnInit() {
    const task = history.state.task;
    if (task) {
      this.enteredTitle.set(task.title);
      this.enteredSummary.set(task.summary);
      this.enteredDate.set(task.dueDate);
    }
  }

  onSubmit() {
    const task = history.state.task;
    this.tasksService.editTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId(),
      task.id
    );
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      // tranh nguoi dung quay lai newTask
      replaceUrl: true
    });
  }
}

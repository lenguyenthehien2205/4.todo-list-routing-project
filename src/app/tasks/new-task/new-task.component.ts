import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  submitted = false;
  private tasksService = inject(TasksService);
  private router = inject(Router);
  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    this.submitted = true;
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      // tranh nguoi dung quay lai newTask
      replaceUrl: true
    });
  }
}

export const canLeaveAddPage: CanDeactivateFn<NewTaskComponent> = (component) => {
  // neu add thi cho di qua
  if(component.submitted){
    return true;
  }
  if(component.enteredDate() || component.enteredSummary() || component.enteredTitle()){
    return window.confirm("Bạn có chắc muốn thoát khi dữ liệu bạn nhập vẫn còn?");
  }
  return true;
}

export const canSubmitAddForm: CanDeactivateFn<NewTaskComponent> = (component) => {
  if(component.submitted){
    if(!component.enteredDate() || !component.enteredSummary() || !component.enteredTitle()){
      window.alert("Vui lòng nhập đầy đủ thông tin!");
      return false;
    }else{
      window.alert("Thêm công việc thành công");
      return true;
    }
  }
  return true;
}
import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { NewTaskComponent } from "../tasks/new-task/new-task.component";
import { EditTaskComponent } from "../tasks/edit-task/edit-task.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks',
        component: TasksComponent
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent
    },
    {
        path: 'tasks/edit',
        component: EditTaskComponent
    }
];
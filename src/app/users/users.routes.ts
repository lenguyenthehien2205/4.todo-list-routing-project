import { Routes } from "@angular/router";
import { TasksComponent } from "../tasks/tasks.component";
import { canLeaveAddPage, canSubmitAddForm, NewTaskComponent } from "../tasks/new-task/new-task.component";
import { canSubmitEditForm, canLeaveEditPage, EditTaskComponent } from "../tasks/edit-task/edit-task.component";

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'prefix'
    },
    {
        path: 'tasks',
        component: TasksComponent,
        // chay lam resolver khi param thay doi
        // runGuardsAndResolvers: 'paramsOrQueryParamsChange',
        // resolve: {
        //     userTasks: resolverUserTasks,
        // }
    },
    {
        path: 'tasks/new',
        component: NewTaskComponent,
        canDeactivate: [canLeaveAddPage, canSubmitAddForm]
    },
    {
        path: 'tasks/edit',
        component: EditTaskComponent,
        canDeactivate: [canLeaveEditPage, canSubmitEditForm]
    }
];
import { Routes } from "@angular/router";
import { routes as userRoutes } from './users/users.routes'
import { resolverUserName, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { TasksComponent } from "./tasks/tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NewTaskComponent } from "./tasks/new-task/new-task.component";
import { NotFoundComponent } from "./tasks/not-found/not-found.component";

export const routes: Routes = [
    {
        path: '',
        // component: NoTaskComponent
        redirectTo: 'users/1',
        pathMatch: 'full'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        resolve: {
            userName: resolverUserName
        }
    }
    ,
    {
        // truong hop khong bat duoc route nao
        path: '**',
        component: NotFoundComponent
    }
]
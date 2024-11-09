import { CanMatch, CanMatchFn, RedirectCommand, Router, Routes } from "@angular/router";
import { routes as userRoutes } from './users/users.routes'
import { resolveTitle, UserTasksComponent } from "./users/user-tasks/user-tasks.component";
import { NoTaskComponent } from "./tasks/no-task/no-task.component";
import { NotFoundComponent } from "./tasks/not-found/not-found.component";
import { inject } from "@angular/core";

// neu ham tra ve true thi ok, false thi se sang url khac
const dummyCanMatch: CanMatchFn = (route, segments) => {
    const shouldGetAccess = Math.random();
    const router = inject(Router);
    if(shouldGetAccess < 0.5){
        return true;
    }
    return new RedirectCommand(router.parseUrl('unauthorized'));
}

export const routes: Routes = [
    {
        path: '',
        component: NoTaskComponent,
        title: 'No task seleted'
    },
    {
        path: 'users/:userId',
        component: UserTasksComponent,
        children: userRoutes,
        // canMatch: [dummyCanMatch],
        // resolve: {
        //     userName: resolveUserName
        // },
        title: resolveTitle
    }
    ,
    {
        // truong hop khong bat duoc route nao
        path: '**',
        component: NotFoundComponent
    }
]
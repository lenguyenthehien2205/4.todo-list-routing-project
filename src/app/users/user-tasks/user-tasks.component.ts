import { Component, computed, DestroyRef, inject, input, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { map } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, ActivatedRouteSnapshot, ResolveFn, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink]
})
export class UserTasksComponent{
  // cach 1 (don gian, nhung can dung withComponentInputBinding
  // userId = input.required<string>(); // lay tu url
  // private userService = inject(UsersService);
  // users = toSignal(this.userService.getUsers(), { initialValue: [] });
  // username = computed(() => {
  //   return this.users().find(user => user.id === Number(this.userId()))?.name;
  // });

  // cach lay bang resolver
  userName = input.required<string>();

  // cach 2 (thuong co trong cac phien ban cu)
  // username = '';
  // private usersService = inject(UsersService);
  // private activatedRoute = inject(ActivatedRoute);
  // users = toSignal(this.usersService.users$, { initialValue: [] });
  // private destroyRef = inject(DestroyRef);
  // ngOnInit(): void {
  //   const subscription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       const userId = paramMap.get('userId');
  //       this.username = this.users().find(u => u.id === Number(userId))?.name ?? '';
  //     }
  //   });
  //   this.destroyRef.onDestroy(() => subscription.unsubscribe());
  // }
}

export const resolverUserName: ResolveFn<string> = (activatedRoute: ActivatedRouteSnapshot) => {
  const usersService = inject(UsersService);
  // let users = toSignal(usersService.users$, {initialValue: []});
  const userId = activatedRoute.paramMap.get('userId');
  const userName = usersService.getUsers().pipe(
    map(users => users.find(user => user.id === Number(userId))?.name ?? '')
  )
  return userName;
}
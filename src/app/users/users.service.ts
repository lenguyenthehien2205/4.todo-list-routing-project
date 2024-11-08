import { Injectable } from '@angular/core';

import { DUMMY_USERS } from '../../dummy-users';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from './user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl: string = 'https://jsonplaceholder.typicode.com/users';
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor(private http: HttpClient) {
    this.fetchUsers(); // Tự động lấy dữ liệu khi service được khởi tạo
  }

  getUsers() {
    return this.users$;
  }

  fetchUsers() {
    return this.http.get<User[]>(this.apiUrl).pipe(
      tap(users => this.usersSubject.next(users))
    ).subscribe();
  }
}

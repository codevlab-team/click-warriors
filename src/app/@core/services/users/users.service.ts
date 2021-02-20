import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  user$ = new BehaviorSubject<User | null>(this.getStoredUser());

  constructor() {}

  get user() {
    return this.getStoredUser();
  }

  saveUser(user: User) {
    this.storeUser(user);
    this.user$.next(user);
  }

  patchUser(user: Partial<User>) {
    localStorage.user = JSON.stringify({ ...this.user, ...user });
  }

  removeUser() {
    this.removeStoredUser();
  }

  private storeUser(user: User): void {
    localStorage.user = JSON.stringify(user);
  }

  private getStoredUser(): User | null {
    const user = localStorage.user;

    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  private removeStoredUser() {
    localStorage.removeItem('user');
  }
}

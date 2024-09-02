// auth.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StorageService } from '../store/storageService';
import { IUser } from '../component/header/header.utils';
import { login, logout } from './auth.actions';
import { selectUser } from '../store/auth.selectors';
import { AppState } from '../store/auth.reducer'; // Ensure the import path is correct

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<IUser | null>;

  constructor(
    private store: Store<AppState>,
    private storageService: StorageService
  ) {
    this.user$ = this.store.select(selectUser);
    this.loadUser();
  }

  private loadUser(): void {
    const userDetails = this.storageService.getObject('userDetails');
    if (userDetails) {
      this.store.dispatch(login({ user: userDetails }));
    }
  }

  public login(user: IUser): void {
    console.log('user', user);
    this.storageService.setObject('userDetails', user);
    this.store.dispatch(login({ user }));
  }

  public logout(): void {
    this.storageService.removeItem('userDetails');
    this.store.dispatch(logout());
  }
}

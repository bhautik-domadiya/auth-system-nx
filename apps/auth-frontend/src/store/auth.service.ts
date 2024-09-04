// auth.service.ts
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, map } from 'rxjs';
import { StorageService } from '../store/storageService';
import { IUser } from '../component/header/header.utils';
import {
  loginAction,
  logoutAction,
  restoreSessionAction,
  signupAction,
} from './auth.actions';
import { selectUser } from '../store/auth.selectors';
import { AppState } from '../store/auth.reducer'; // Ensure the import path is correct
import {
  IAuthLoginPayload,
  IAuthResponse,
  IAuthSignupPayload,
} from './auth.inerface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<IUser | null>;

  apiRoute = `${environment.apiUrl}/auth`;

  constructor(
    private store: Store<AppState>,
    private storageService: StorageService,
    private http: HttpClient
  ) {
    this.user$ = this.store.select(selectUser);
    this.loadUser();
  }

  private loadUser(): void {
    const userDetails = this.storageService.getObject('userDetails');
    if (userDetails) {
      this.store.dispatch(restoreSessionAction({ user: userDetails }));
    }
  }

  public signup(user: IAuthSignupPayload) {
    return this.http
      .post<IAuthResponse>(`${this.apiRoute}/register`, user)
      .pipe(
        map((data) => {
          this.setLocalStorageData(data);
          this.store.dispatch(signupAction({ user: data.user }));
          return data.user;
        })
      );
  }

  public login(user: IAuthLoginPayload) {
    return this.http.post<IAuthResponse>(`${this.apiRoute}/login`, user).pipe(
      map((data) => {
        this.setLocalStorageData(data);
        this.store.dispatch(loginAction({ user: data.user }));
        return data.user;
      })
    );
  }

  setLocalStorageData(data: IAuthResponse) {
    this.storageService.setObject('userDetails', data.user);
    this.storageService.setObject('auth', {
      access_token: data.access_token,
      refresh_token: data.refresh_token,
    });
  }

  public logout(): void {
    this.storageService.clear();
    this.store.dispatch(logoutAction());
  }
}

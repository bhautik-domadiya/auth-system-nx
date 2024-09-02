import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { StorageService } from '../store/storageService';
import { IUser } from '../component/header/header.utils';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject: BehaviorSubject<IUser | null> =
    new BehaviorSubject<IUser | null>(null);
  public user$: Observable<IUser | null> = this.userSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadUser();
  }

  private loadUser(): void {
    const userDetails = this.storageService.getObject('userDetails');
    this.userSubject.next(userDetails);
  }

  public login(user: IUser): void {
    this.storageService.setObject('userDetails', user);
    this.userSubject.next(user);
  }

  public logout(): void {
    this.storageService.removeItem('userDetails');
    this.userSubject.next(null);
  }
}

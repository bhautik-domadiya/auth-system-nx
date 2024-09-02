import { AsyncPipe, CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { combineLatest } from 'rxjs';
import { StorageService } from '../../store/storageService';
import { Router } from '@angular/router';
// import { AuthService } from '../../guard/auth.service';
import { IUser } from '../../component/header/header.utils';
import { AuthService } from '../../store/auth.service';

// import { AuthFacade } from '../store/auth.facade';

@Component({
  selector: 'aa-login',
  standalone: true,
  imports: [
    CommonModule,
    AsyncPipe,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  constructor(
    private storageService: StorageService,
    private router: Router,
    private authService: AuthService
  ) {}

  readonly loginForm = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });

  // readonly vm$ = combineLatest({
  //   isLoading: this.authFacade.isLoadingLogin$,
  //   showLoginError: this.authFacade.hasLoginError$,
  // });

  submit() {
    const { username, password } = this.loginForm.value;
    this.router.navigate(['/home']);
    if (username) {
      const payload: IUser = {
        name: username,
        lastName: username,
      };
      this.authService.login(payload);
      this.storageService.setObject('userDetails', payload);
    }
  }
}

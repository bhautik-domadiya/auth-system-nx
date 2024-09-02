// auth.reducer.ts
import { Action, createReducer, on } from '@ngrx/store';
import { login, logout } from './auth.actions';
import { IUser } from '../component/header/header.utils';

export interface AuthState {
  user: IUser | null;
}

export interface AppState {
  auth: AuthState;
}

export const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(login, (state, { user }) => ({ ...state, user })),
  on(logout, (state) => ({ ...state, user: null }))
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return _authReducer(state, action);
}

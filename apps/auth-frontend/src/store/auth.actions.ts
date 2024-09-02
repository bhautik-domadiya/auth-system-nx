import { createAction, props } from '@ngrx/store';
import { IUser } from '../component/header/header.utils';

export const login = createAction('[Auth] Login', props<{ user: IUser }>());

export const logout = createAction('[Auth] Logout');

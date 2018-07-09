import { Action } from '@ngrx/store';
import { EmailSignInModel } from '../models/email-sign-in.model';
import { EmailSignUpModel } from '../models/email-sign-up.model';
import { ProfileModel } from '../models/profile.model';

export enum AuthActionTypes {
  EmailSignIn = '[Auth] Email Sign In',
  SignInSuccess = '[Auth] Sign In Success',
  SignOut = '[Auth] Logout',
  GetProfile = '[Auth] Get Profile',
  Authenticated = '[Auth] Authenticated',
  NotAuthenticated = '[Auth] Not Authenticated',
  AuthError = '[Auth] Authenticated Error',
  EmailSignUp = '[Auth] Email Sign Up',
  SignUpSuccess = '[Auth] Email Sign Up',
  SignInRedirect = '[Auth] Sign In Redirect',
  RootRedirect = '[Auth] Root Redirect',
}

export class EmailSignIn implements Action {
  public readonly type = AuthActionTypes.EmailSignIn;

  constructor(public payload: EmailSignInModel) {
  }
}

export class EmailSignUp implements Action {
  public readonly type = AuthActionTypes.EmailSignUp;

  constructor(public payload: EmailSignUpModel) {
  }
}

export class SignInSuccess implements Action {
  public readonly type = AuthActionTypes.SignInSuccess;

  constructor(public payload: any) {
  }
}

export class SignOut implements Action {
  public readonly type = AuthActionTypes.SignOut;

  constructor(public payload?: any) {
  }
}

export class Authenticated implements Action {
  public readonly type = AuthActionTypes.Authenticated;

  constructor(public payload: ProfileModel) {
  }
}

export class GetProfile implements Action {
  public readonly type = AuthActionTypes.GetProfile;

  constructor(public payload?: any) {
  }
}

export class NotAuthenticated implements Action {
  public readonly type = AuthActionTypes.NotAuthenticated;

  constructor() {
  }
}

export class AuthError implements Action {
  public readonly type = AuthActionTypes.AuthError;

  constructor(public payload: { error: string }) {
  }
}

export class SignUpSuccess implements Action {
  public readonly type = AuthActionTypes.SignUpSuccess;

  constructor(public payload: { error: string }) {
  }
}

export class SignInRedirect implements Action {
  public readonly type = AuthActionTypes.SignInRedirect;

  constructor(public payload?: any) {
  }
}

export class RootRedirect implements Action {
  public readonly type = AuthActionTypes.RootRedirect;

  constructor(public payload?: any) {
  }
}

export type AuthActions = EmailSignIn
  | EmailSignUp
  | SignInSuccess
  | SignInRedirect
  | RootRedirect
  | SignOut
  | GetProfile
  | Authenticated
  | NotAuthenticated
  | AuthError;

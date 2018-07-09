import { CommonModule } from '@angular/common';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared/shared.module';
import { routes } from './auth.routes';
import { EmailSignInFormComponent } from './components/email-sign-in-form';
import { EmailSignUpFormComponent } from './components/email-sign-up-form';
import { ResetEmailPasswordFormComponent } from './components/reset-email-password-form';
import { AuthPageComponent } from './containers/auth-page';
import { ResetPasswordComponent } from './containers/reset-password';
import { ResetPasswordCompleteComponent } from './containers/reset-password-complete';
import { SignInPageComponent } from './containers/sign-in-page';
import { SignUpPageComponent } from './containers/sign-up-page';
import { AuthEffect } from './effects/auth-effect.service';
import { reducers } from './reducers';
import { AnonymousGuard } from './services/anonymous-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AuthService } from './services/auth.service';

export const components = [
  // containers
  AuthPageComponent,
  SignInPageComponent,
  SignUpPageComponent,

  // components
  EmailSignInFormComponent,
  EmailSignUpFormComponent
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes),

    /**
     * StoreModule.forFeature is used for composing state
     * from feature modules. These modules can be loaded
     * eagerly or lazily and will be dynamically added to
     * the existing state.
     */
    StoreModule.forFeature('auth', reducers),
    /**
     * Effects.forFeature is used to register effects
     * from feature modules. Effects can be loaded
     * eagerly or lazily and will be started immediately.
     *
     * All Effects will only be instantiated once regardless of
     * whether they are registered once or multiple times.
     */
    EffectsModule.forFeature([AuthEffect])
  ],
  declarations: components,
  exports: components
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [AuthService, AuthGuard, AnonymousGuard]
    };
  }

  constructor() {

  }
}

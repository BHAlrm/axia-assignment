import { Routes } from '@angular/router';
import { AuthPageComponent } from './containers/auth-page';
import { ResetPasswordComponent } from './containers/reset-password';
import { ResetPasswordCompleteComponent } from './containers/reset-password-complete';
import { SignInPageComponent } from './containers/sign-in-page';
import { SignUpPageComponent } from './containers/sign-up-page';
import { AnonymousGuard } from './services/anonymous-guard.service';

export const routes: Routes = [
    {
        path: 'auth',
        component: AuthPageComponent,
        children: [
            { path: '', redirectTo: 'sign-in', pathMatch: 'full'},
            { path: 'sign-in', component: SignInPageComponent, canActivate: [AnonymousGuard] },
            { path: 'sign-up', component: SignUpPageComponent, canActivate: [AnonymousGuard] }
        ]
    },

];

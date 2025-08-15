import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { GuestActivate } from '../guards/guest.activate';
import { AuthActivate } from '../guards/auth.activate';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [GuestActivate] },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [GuestActivate],
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthActivate],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}

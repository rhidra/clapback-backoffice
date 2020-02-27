import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSearchComponent} from './search/search.component';
import {UserEditComponent} from './edit/edit.component';
import {AuthGuardService} from '../auth/auth-guard.service';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: UserSearchComponent, canActivate: [AuthGuardService], data: {permission: 'admin'} },
  { path: 'edit', component: UserEditComponent, canActivate: [AuthGuardService], data: {permission: 'admin'} },
  { path: 'edit/:id', component: UserEditComponent, canActivate: [AuthGuardService], data: {permission: 'admin'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

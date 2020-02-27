import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {NotFoundComponent} from './utils/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'group', loadChildren: './group/group.module#GroupModule', canActivate: [AuthGuardService]},
  { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuardService]},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

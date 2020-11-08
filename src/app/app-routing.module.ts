import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthGuardService} from './auth/auth-guard.service';
import {NotFoundComponent} from './utils/not-found/not-found.component';


const routes: Routes = [
  { path: '', redirectTo: 'topic', pathMatch: 'full'},
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuardService]},
  { path: 'topic', loadChildren: './topic/topic.module#TopicModule', canActivate: [AuthGuardService]},
  { path: 'reaction', loadChildren: './reaction/reaction.module#ReactionModule', canActivate: [AuthGuardService]},
  { path: 'user', loadChildren: './user/user.module#UserModule', canActivate: [AuthGuardService], data: {permission: 'editor'}},
  { path: 'admin', loadChildren: './admin/admin.module#AdminModule', canActivate: [AuthGuardService], data: {permission: 'admin'}},
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

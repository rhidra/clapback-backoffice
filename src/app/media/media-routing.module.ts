import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuardService} from '../auth/auth-guard.service';
import {MediaVideosComponent} from './videos/videos.component';
import {MediaImagesComponent} from './images/images.component';


const routes: Routes = [
  { path: '', redirectTo: 'videos', pathMatch: 'full'},
  { path: 'videos', component: MediaVideosComponent, canActivate: [AuthGuardService], data: {permission: 'admin'} },
  { path: 'images', component: MediaImagesComponent, canActivate: [AuthGuardService], data: {permission: 'admin'} },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MediaRoutingModule { }

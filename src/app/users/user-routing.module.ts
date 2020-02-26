import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSearchComponent} from './search/search.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: UserSearchComponent },
  { path: 'edit', component: UserSearchComponent },
  { path: 'edit/:id', component: UserSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

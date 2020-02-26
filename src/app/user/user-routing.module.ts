import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserSearchComponent} from './search/search.component';
import {UserEditComponent} from './edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: UserSearchComponent },
  { path: 'edit', component: UserEditComponent },
  { path: 'edit/:id', component: UserEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {GroupSearchComponent} from './search/search.component';
import {GroupEditComponent} from './edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: GroupSearchComponent },
  { path: 'edit', component: GroupEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }

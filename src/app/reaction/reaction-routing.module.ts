import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ReactionSearchComponent} from './search/search.component';
import {ReactionEditComponent} from './edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: ReactionSearchComponent },
  { path: 'edit/:id', component: ReactionEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReactionRoutingModule { }

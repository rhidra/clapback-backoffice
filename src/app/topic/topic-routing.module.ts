import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {TopicSearchComponent} from './search/search.component';
import {TopicEditComponent} from './edit/edit.component';


const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: TopicSearchComponent },
  { path: 'edit', component: TopicEditComponent },
  { path: 'edit/:id', component: TopicEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TopicRoutingModule { }

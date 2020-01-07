import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ModelSearchComponent} from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: 'search', pathMatch: 'full'},
  { path: 'search', component: ModelSearchComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModelRoutingModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupSearchComponent } from './search/search.component';
import { GroupEditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    GroupSearchComponent,
    GroupEditComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule
  ]
})
export class GroupModule { }

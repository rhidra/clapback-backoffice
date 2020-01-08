import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupSearchComponent } from './search/search.component';
import { GroupEditComponent } from './edit/edit.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    GroupSearchComponent,
    GroupEditComponent
  ],
  imports: [
    CommonModule,
    GroupRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class GroupModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersSearchComponent } from './search/search.component';
import {MatTableModule} from '@angular/material/table';


@NgModule({
  declarations: [UsersSearchComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule
  ]
})
export class UsersModule { }

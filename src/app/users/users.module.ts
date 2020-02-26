import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersSearchComponent } from './search/search.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [UsersSearchComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule
  ]
})
export class UsersModule { }

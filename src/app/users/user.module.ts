import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserSearchComponent } from './search/search.component';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { UserEditComponent } from './edit/edit.component';


@NgModule({
  declarations: [
    UserSearchComponent,
    UserEditComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    MatTableModule,
    MatTooltipModule,
    MatListModule,
    MatIconModule
  ]
})
export class UserModule { }

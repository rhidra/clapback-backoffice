import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GroupRoutingModule } from './group-routing.module';
import { GroupSearchComponent } from './search/search.component';
import { GroupEditComponent } from './edit/edit.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {UtilsModule} from '../utils/utils.module';
import {MatSelectModule} from '@angular/material/select';


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
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    UtilsModule,
    MatSelectModule
  ]
})
export class GroupModule { }

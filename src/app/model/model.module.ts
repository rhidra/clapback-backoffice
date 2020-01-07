import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModelRoutingModule } from './model-routing.module';
import { ModelSearchComponent } from './search/search.component';
import {
  MatButtonModule,
  MatCardModule, MatChipsModule, MatDialogModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatOptionModule,
  MatPaginatorModule, MatProgressSpinnerModule, MatSelectModule,
  MatSortModule, MatTableModule, MatTooltipModule
} from '@angular/material';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {UtilsModule} from '../utils/utils.module';

@NgModule({
  declarations: [
    ModelSearchComponent,
  ],
  imports: [
    UtilsModule,
    CommonModule,
    ModelRoutingModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    MatCardModule,
    MatOptionModule,
    MatSelectModule,
  ],
  entryComponents: [
  ],
})
export class ModelModule { }

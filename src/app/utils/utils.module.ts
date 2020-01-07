import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {HelperService} from './helper.service';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {
  MatButtonModule,
  MatButtonToggleModule,
  MatChipsModule, MatFormFieldModule,
  MatIconModule, MatInputModule, MatMenuModule,
  MatSortModule,
  MatTableModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';


@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    RouterModule,
    FlexLayoutModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatSortModule,
    MatTableModule,
    MatChipsModule,
    MatFormFieldModule,
    MatMenuModule,
    MatInputModule,
  ],
  declarations: [
  ],
  exports: [
  ],
  entryComponents: [],
  providers: [HelperService],

})
export class UtilsModule {
}

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
import { DialogComponent } from './dialog/dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import { DatetimepickerComponent } from './datetimepicker/datetimepicker.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {
  MAT_MOMENT_DATE_ADAPTER_OPTIONS, MAT_MOMENT_DATE_FORMATS,
  MatMomentDateModule,
  MomentDateAdapter
} from '@angular/material-moment-adapter';
import { UploadInputComponent } from './upload-input/upload-input.component';
import { NotFoundComponent } from './not-found/not-found.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MediaUrlPipe} from "./pipes/media-url.pipe";


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
    MatDialogModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
  ],
  declarations: [
    DialogComponent,
    DatetimepickerComponent,
    UploadInputComponent,
    NotFoundComponent,
    MediaUrlPipe,
  ],
  exports: [
    DatetimepickerComponent,
    UploadInputComponent,
    MediaUrlPipe,
  ],
  entryComponents: [
    DialogComponent,
  ],
  providers: [
    HelperService,
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
    },
    {
      provide: MAT_DATE_FORMATS,
      useValue: {
        parse: {
          dateInput: ['LL', 'L'],
        },
        display: {
          dateInput: 'LL',
          monthYearLabel: 'MMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY',
        },
    }},
  ],

})
export class UtilsModule {
}

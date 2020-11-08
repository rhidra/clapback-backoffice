import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MediaRoutingModule } from './media-routing.module';
import { MediaVideosComponent } from './videos/videos.component';
import {MatTableModule} from '@angular/material/table';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import {FlexModule} from '@angular/flex-layout';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MediaImagesComponent } from './images/images.component';


@NgModule({
  declarations: [
    MediaVideosComponent,
    MediaImagesComponent,
  ],
  imports: [
    CommonModule,
    MediaRoutingModule,
    MatTableModule,
    MatListModule,
    MatIconModule,
    MatCheckboxModule,
    MatButtonModule,
    FlexModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule
  ]
})
export class MediaModule { }

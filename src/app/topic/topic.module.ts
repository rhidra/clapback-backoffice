import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TopicRoutingModule } from './topic-routing.module';
import { TopicSearchComponent } from './search/search.component';
import { TopicEditComponent } from './edit/edit.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {UtilsModule} from '../utils/utils.module';
import {MatSelectModule} from '@angular/material/select';
import {FlexModule} from '@angular/flex-layout';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { QuizComponent } from './quiz/quiz.component';


@NgModule({
  declarations: [
    TopicSearchComponent,
    TopicEditComponent,
    QuizComponent
  ],
  imports: [
    CommonModule,
    TopicRoutingModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    UtilsModule,
    MatSelectModule,
    FlexModule,
    MatTooltipModule,
    MatCardModule,
    MatCheckboxModule,
    FormsModule,
  ]
})
export class TopicModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactionRoutingModule } from './reaction-routing.module';
import { ReactionSearchComponent } from './search/search.component';
import {ReactionService} from './reaction.service';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatGridListModule} from '@angular/material/grid-list';
import {VgCoreModule} from 'videogular2/compiled/src/core/core';
import {VgControlsModule} from 'videogular2/compiled/src/controls/controls';
import {MatButtonModule} from '@angular/material/button';
import { ReactionEditComponent } from './edit/edit.component';
import {VgOverlayPlayModule} from 'videogular2/compiled/src/overlay-play/overlay-play';


@NgModule({
  declarations: [ReactionSearchComponent, ReactionEditComponent],
  imports: [
    CommonModule,
    ReactionRoutingModule,
    MatListModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    VgCoreModule,
    VgControlsModule,
    MatButtonModule,
    VgOverlayPlayModule
  ],
  providers: [
    ReactionService,
  ]
})
export class ReactionModule { }

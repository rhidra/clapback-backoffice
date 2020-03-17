import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactionRoutingModule } from './reaction-routing.module';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [SearchComponent],
  imports: [
    CommonModule,
    ReactionRoutingModule
  ]
})
export class ReactionModule { }

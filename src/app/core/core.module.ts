import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar/sidebar.component';
import {
  MatButtonModule, MatIconModule, MatListModule, MatMenuModule, MatSidenavModule,
  MatToolbarModule,
  MatExpansionModule, MatTooltipModule, MatFormFieldModule, MatInputModule,
} from '@angular/material';
import {RouterModule} from '@angular/router';
import {FlexLayoutModule} from '@angular/flex-layout';
import {FormsModule} from '@angular/forms';
import {NavbarComponent} from './navbar/navbar.component';
import {NavbarService} from './navbar/navbar.service';

@NgModule({
  imports: [
    CommonModule,
    FlexLayoutModule,
    RouterModule,
    FormsModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule,
    MatTooltipModule,
  ],
  declarations: [
    SidebarComponent,
    NavbarComponent,
  ],
  exports: [
    SidebarComponent,
    NavbarComponent
  ],
  providers: [
    NavbarService,
  ]
})
export class CoreModule { }

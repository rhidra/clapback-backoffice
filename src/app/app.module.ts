import {BrowserModule, DomSanitizer} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {HttpClientModule} from '@angular/common/http';
import {LOCALE_ID, NgModule} from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import {
  MatIconRegistry,
  MatIconModule,
  MatCardModule,
  MatListModule,
  MatButtonModule,
  MAT_DATE_LOCALE,
  MatSnackBarModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatSelectModule,
  MatCheckboxModule, MatInputModule, MatDialogModule, MatProgressSpinnerModule
} from '@angular/material';
import { CoreModule } from './core/core.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import {UtilsModule} from './utils/utils.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatTreeModule} from '@angular/material/tree';
import {MatExpansionModule} from '@angular/material/expansion';

registerLocaleData(localeFr, 'fr');


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    UtilsModule,
    HttpClientModule,
    MatSidenavModule,
    MatSelectModule,
    MatAutocompleteModule,
    MatCheckboxModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatDatepickerModule,
    AppRoutingModule,
    CoreModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    MatSnackBarModule,
    MatExpansionModule,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr' },
    { provide: MAT_DATE_LOCALE, useValue: 'fr' },
  ],
  entryComponents: [],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private matIconRegistry: MatIconRegistry, private sanitizer: DomSanitizer) {
    this.matIconRegistry.registerFontClassAlias('fa', 'fa');
    this.matIconRegistry.registerFontClassAlias('fas', 'fas');
  }
}

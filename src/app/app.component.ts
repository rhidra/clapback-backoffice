import {ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID, ViewChild} from '@angular/core';
import {MediaChange, MediaObserver} from '@angular/flex-layout';
import {NavigationEnd, Router} from '@angular/router';
import {MatSidenavContainer} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  constructor(
    public media: MediaObserver,
    private router: Router
  ) {}

  ngOnInit() {
  }
}

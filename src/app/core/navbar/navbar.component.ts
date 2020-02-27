import {Component, OnInit, ChangeDetectionStrategy, ElementRef, ChangeDetectorRef, ViewChild} from '@angular/core';
import {NavbarService} from './navbar.service';
import {Subject} from 'rxjs';
import {AuthService} from '../../auth/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {

  navbarInfo: any = null;
  query: string = '';
  queryChanged: Subject<string> = new Subject<string>();
  @ViewChild('toolbar', {read: ElementRef, static: true}) toolbar: ElementRef;
  @ViewChild('searchBar', {read: ElementRef, static: true}) searchBar: ElementRef;

  constructor(
    public navbarService: NavbarService,
    private cdRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    this.navbarInfo = Object.assign({}, this.navbarService.navbarInfo);
    this.navbarService.navbarUpdated.subscribe((navbarInfo) => {
      this.navbarInfo = Object.assign({}, navbarInfo);
      this.cdRef.detectChanges();
    });

    this.queryChanged.subscribe(query => {
      this.navbarInfo.queryChangedCb(this.query);
    });
  }

  getBlockWidth() {
    return (this.toolbar.nativeElement.offsetWidth - this.searchBar.nativeElement.offsetWidth - 32) / 2;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth']);
  }
}

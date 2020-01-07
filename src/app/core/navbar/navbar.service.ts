import {ChangeDetectorRef, EventEmitter, Injectable, NgZone, Output} from '@angular/core';
import {Location} from '@angular/common';
import {Subject} from 'rxjs';
import {NavigationStart, Router} from '@angular/router';

@Injectable()
export class NavbarService {
  public query: string = '';
  public queryChanged: Subject<any> = new Subject<any>();
  public isExpanded: boolean = true;

  private widths = {0: 64, 1: 260};
  public navbarInfo = {title: '', addCb: null, addPlaceholder: '', actions: [], queryChangedCb: null, filterCb: null, backCb: null};
  public closeButtonVisible: boolean = true;
  sidebarElement: any = null;
  public navbarUpdated = new EventEmitter<any>();

  titles: any = {};


  constructor(
    private location: Location,
    private zone: NgZone,
    private router: Router
  ) {}

  public updateNavbar(title: string, addCb: any = null, addPlaceholder: string = '', queryChangedCb: any = null, actions: any[] = [], filterCb: any = null, backCb: any = null) {
    if (title !== null) {
      this.navbarInfo.title = title;
    }
    this.navbarInfo.addCb = addCb;
    this.navbarInfo.addPlaceholder = addPlaceholder;
    this.navbarInfo.queryChangedCb = queryChangedCb;
    this.navbarInfo.actions = actions;
    this.navbarInfo.filterCb = filterCb;
    this.navbarInfo.backCb = backCb;
    this.navbarUpdated.emit(this.navbarInfo);
  }

  public setTitle(title: string) {
    this.navbarInfo.title = title;
    this.navbarUpdated.emit(this.navbarInfo);
  }
  public setBackCb(backCb: any) {
    this.navbarInfo.backCb = backCb;
    this.navbarUpdated.emit(this.navbarInfo);
  }

  public setActions(actions: any[]) {
    if (actions !== null) {
      this.navbarInfo.actions = actions;
    }
    this.navbarUpdated.emit(this.navbarInfo);
  }
}

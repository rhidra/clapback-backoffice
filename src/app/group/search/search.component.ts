import { Component, OnInit } from '@angular/core';
import {GroupService} from '../group.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {NewsGroup} from '../../models/newsgroup.model';
import * as moment from 'moment';
import {DialogComponent} from '../../utils/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class GroupSearchComponent implements OnInit {

  isLoading = true;
  moment = moment;
  groups = {current: Array<NewsGroup>(), future: Array<NewsGroup>(), past: Array<NewsGroup>()};

  constructor(
    private groupService: GroupService,
    private navbarService: NavbarService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('News groups', () => {}, null, () => {});
    this.groupService.load().then(() => {
      this.build_groups();
      this.isLoading = false;
    });
  }

  build_groups() {
    this.groups = {current: Array<NewsGroup>(), future: Array<NewsGroup>(), past: Array<NewsGroup>()};
    const latest = this.groupService.groups.reduce((ltst: any, grp: any) => moment(grp.date) > moment(ltst.date) && moment(grp.date) <= moment() ? grp : ltst);
    this.groups.current.push(latest);
    this.groupService.groups.forEach(group => {
      if (group !== latest && moment(group.date) < moment()) {
        this.groups.past.push(group);
      } else if (group !== latest) {
        this.groups.future.push(group);
      }
    });
  }

  search(query: string) {
    this.groupService.search(query).then(() => {
      this.isLoading = false;
    });
  }

  edit(group: NewsGroup) {
    console.log('ùnergf');
  }

  delete(e: Event, group: NewsGroup) {
    e.preventDefault();
    e.stopImmediatePropagation();

    const data = {title: 'Confirmation', content: 'Do you really want to delete this news group ?'};
    this.dialog.open(DialogComponent, {data: data})
      .afterClosed().subscribe(res => {
        if (res) {
          this.groupService.delete(group).then(() => this.build_groups());
        }
    });
  }
}

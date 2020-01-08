import { Component, OnInit } from '@angular/core';
import {GroupService} from '../group.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {NewsGroup} from '../../models/newsgroup.model';
import * as moment from 'moment';

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
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('News groups', () => {}, null, () => {});
    this.groupService.load().then(() => {
      const latest = this.groupService.groups.reduce((ltst: any, grp: any) => moment(grp.date) > moment(ltst.date) && moment(grp.date) <= moment() ? grp : ltst);
      this.groups.current.push(latest);
      this.groupService.groups.forEach(group => {
        if (group !== latest && moment(group.date) < moment()) {
          this.groups.past.push(group);
        } else if (group !== latest) {
          this.groups.future.push(group);
        }
      });
      this.isLoading = false;
    });
  }

  search(query: string) {
    this.groupService.search(query).then(() => {
      this.isLoading = false;
    });
  }
}

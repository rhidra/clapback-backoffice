import { Component, OnInit } from '@angular/core';
import {TopicService} from '../topic.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import * as moment from 'moment';
import {DialogComponent} from '../../utils/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Topic} from '../../models/topic.model';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class TopicSearchComponent implements OnInit {

  isLoading = true;
  moment = moment;

  constructor(
    public topicService: TopicService,
    public navbarService: NavbarService,
    public dialog: MatDialog,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('News groups', () => this.router.navigate(['/topic/edit']), null, () => {});
    this.topicService.search().then(() => {
      this.isLoading = false;
    });
  }

  search(query: string) {
    this.topicService.search(query).then(() => {
      this.isLoading = false;
    });
  }

  approve(e: Event, topic: Topic) {
    if (!this.authService.hasPerm('editor')) { return; }

    e.preventDefault();
    e.stopImmediatePropagation();

    this.dialog.open(DialogComponent, {data: {
      title: 'Publishing content',
      content: 'Do you want to change the approved state of this news topic ?',
      isChoice: true,
    }})
      .afterClosed().subscribe(res => {
        if (res) {
          topic.approved = !topic.approved;
          this.topicService.edit(topic);
        }
    });
  }

  delete(e: Event, topic: Topic) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.dialog.open(DialogComponent, {data: {
      title: 'Deleting content',
      content: 'Do you really want to delete this news group ?',
      isChoice: true,
    }})
      .afterClosed().subscribe(res => {
        if (res) {
          this.topicService.delete(topic);
        }
    });
  }
}

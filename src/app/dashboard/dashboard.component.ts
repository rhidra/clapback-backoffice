import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../core/navbar/navbar.service';
import {TopicService} from '../topic/topic.service';
import {Topic} from '../models/topic.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  isLoading = true;
  latest: Topic;

  constructor(
    private navbarService: NavbarService,
    private topicService: TopicService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Dashboard');
    this.topicService.search().then(() => {
      this.latest = this.topicService.topics[0];
      this.isLoading = false;
    });
  }

}

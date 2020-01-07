import { Component, OnInit } from '@angular/core';
import {GroupService} from '../group.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class GroupSearchComponent implements OnInit {

  isLoading = true;

  constructor(
    private groupService: GroupService
  ) { }

  ngOnInit() {
    this.groupService.load().then(() => {
      this.isLoading = false;
    });
  }

}

import { Component, OnInit } from '@angular/core';
import {UsersService} from '../users.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class UsersSearchComponent implements OnInit {

  displayedColumns: Array<string> = ['_id', 'email', 'phone', 'permissions'];
  dataSource: Array<any>;
  isLoading: boolean;

  constructor(
    private usersService: UsersService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.usersService.load().then(() => {
      this.isLoading = false;
    });
  }

}

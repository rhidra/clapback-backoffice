import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class UserSearchComponent implements OnInit {

  displayedColumns: Array<string> = ['_id', 'email', 'phone', 'permissions'];
  isLoading: boolean;

  constructor(
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.isLoading = true;
    this.userService.load().then(() => {
      this.isLoading = false;
    });
  }

}

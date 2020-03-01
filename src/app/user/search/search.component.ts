import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {NavbarService} from '../../core/navbar/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class UserSearchComponent implements OnInit {

  displayedColumns: Array<string> = ['_id', 'name', 'email', 'phone', 'level', 'verified', 'permissions'];
  isLoading: boolean = true;

  constructor(
    private navbarService: NavbarService,
    private userService: UserService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Users', null, '', q => this.search(q));
    this.search();
  }

  search(query: string = '') {
    console.log(query);
    this.userService.search(query).then(() => this.isLoading = false);
  }
}

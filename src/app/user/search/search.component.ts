import { Component, OnInit } from '@angular/core';
import {UserService} from '../user.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from 'src/app/utils/dialog/dialog.component';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class UserSearchComponent implements OnInit {

  displayedColumns: Array<string> = ['image', 'name', 'email', 'phone', 'level', 'verified', 'permissions', 'actions'];
  isLoading: boolean = true;

  constructor(
    public navbarService: NavbarService,
    public userService: UserService,
    public router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Users', () => this.router.navigate(['/user/edit']), 'Add User', q => this.search(q));
    this.search();
  }

  search(query: string = '') {
    console.log(query);
    this.userService.search(query).then(() => this.isLoading = false);
  }

  changePassword(event: any, id: string) {
    event.preventDefault();
    event.stopImmediatePropagation();

    this.dialog.open(DialogComponent, {data: {
      title: 'Change user password', 
      content: 'WARNING: You will change this user password ! Becareful, otherwise this user will not be able to access his account anymore !',
      lockUser: false, 
      input: 'Password',
    }}).afterClosed().subscribe(async res => {
      if (res) {
        await this.userService.changePassword(id, res);
        this.snackBar.open('Password updated !');
      }
    });
  }
}

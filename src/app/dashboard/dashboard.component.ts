import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../core/navbar/navbar.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  isLoading = true;

  constructor(
    private navbarService: NavbarService
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Dashboard');
    this.isLoading = false;
  }

}

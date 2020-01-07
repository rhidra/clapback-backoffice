import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../core/navbar/navbar.service';
import {DashboardService} from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  isLoading = true;

  constructor(
    private navbarService: NavbarService,
    private dashboardService: DashboardService
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Dashboard');
    this.dashboardService.load().then(() => {
      this.isLoading = false;
    });
  }

}

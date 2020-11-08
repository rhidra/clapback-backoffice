import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
})
export class SidebarComponent implements OnInit {

  rabbitMQUrl = env.rabbitMQAdminPanelUrl;

  constructor(
    public authService: AuthService,
  ) { }

  ngOnInit() {

  }
}

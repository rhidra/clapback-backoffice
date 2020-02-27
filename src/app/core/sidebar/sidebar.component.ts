import {
  Component,
  OnInit,
} from '@angular/core';
import {NavbarService} from '../navbar/navbar.service';
import {AuthService} from '../../auth/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    private authService: AuthService,
  ) { }

  ngOnInit() {

  }


}

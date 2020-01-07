import {
  Component,
  OnInit,
} from '@angular/core';
import {NavbarService} from '../navbar/navbar.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(public navbarService: NavbarService) {
  }

  ngOnInit() {

  }


}

import { Component, OnInit } from '@angular/core';
import {ReactionService} from '../reaction.service';
import {environment as env} from '../../../environments/environment';
import {NavbarService} from '../../core/navbar/navbar.service';

@Component({
  selector: 'app-reaction-search',
  templateUrl: './search.component.html',
})
export class ReactionSearchComponent implements OnInit {

  isLoading = true;
  cols;

  constructor(
    public reactionService: ReactionService,
    public navbarService: NavbarService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Clapbacks');
    this.reactionService.search().then(() => this.isLoading = false);
    this.onResize();
  }

  onResize(event = {target: window}) {
    const w = event.target.innerWidth;
    this.cols = w > 1440 ? 5
                    : w > 1200 ? 4
                    : w > 1000 ? 3
                    : w > 800  ? 2 : 1;
  }
}

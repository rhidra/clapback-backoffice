import { Component, OnInit } from '@angular/core';
import {ReactionService} from '../reaction.service';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-reaction-search',
  templateUrl: './search.component.html',
})
export class ReactionSearchComponent implements OnInit {

  isLoading = true;
  host = env.mediaHost;
  cols;

  constructor(
    public reactionService: ReactionService,
  ) { }

  ngOnInit() {
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

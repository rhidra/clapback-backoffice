import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {NavbarService} from '../../core/navbar/navbar.service';
import {ReactionService} from '../reaction.service';
import {Location} from '@angular/common';
import {Reaction} from '../../models/reaction.model';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class ReactionEditComponent implements OnInit {

  reaction: Reaction;

  constructor(
    public activatedRoute: ActivatedRoute,
    public navbarService: NavbarService,
    public reactionService: ReactionService,
    public location: Location,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Edit clapback', null, '', null, [], null, () => this.location.back());
    this.activatedRoute.params.subscribe(params => {
      const id = params.id;
      this.reactionService.get(id).then((reaction: Reaction) => {
        this.reaction = reaction;
        this.initForm();
      });
    });
  }

  initForm() {

  }
}

import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NewsGroup} from '../../models/newsgroup.model';
import {ActivatedRoute} from '@angular/router';
import {GroupService} from '../group.service';
import {NavbarService} from '../../core/navbar/navbar.service';
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
})
export class GroupEditComponent implements OnInit {
  form: FormGroup;
  group: NewsGroup;
  isCreation: boolean;
  isLoading = true;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private groupService: GroupService,
    private navbarService: NavbarService,
    private location: Location
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New' : 'Edit');

      if (this.isCreation) {
        this.group = new NewsGroup();
        this.initForm();
      } else {
        this.groupService.get(id).then((group: NewsGroup) => {
          this.group = group;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      date: [this.group.date || '', [Validators.required]],
      content: [this.group.content || '', [Validators.required]],
    });
    this.isLoading = false;
  }

  onSubmit() {
    Object.assign(this.group, this.form.value);

    if (this.isCreation) {
      this.groupService.create(this.group).then(model => {
        this.location.back();
      });
    } else {
      this.groupService.edit(this.group).then(() => {
        this.location.back();
      });
    }
  }
}

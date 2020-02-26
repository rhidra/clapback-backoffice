import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute} from '@angular/router';
import {NavbarService} from '../../core/navbar/navbar.service';
import {User} from '../../models/user.model';
import {Location} from '@angular/common';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class UserEditComponent implements OnInit {

  isCreation: boolean;
  user: User;
  form: FormGroup;
  isLoading = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private fb: FormBuilder,
    private location: Location,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New user' : 'Edit user');

      if (this.isCreation) {
        this.user = new User();
        this.initForm();
      } else {
        this.userService.get(id).then((user: User) => {
          this.user = user;
          this.initForm();
        });
      }
    });
  }

  initForm() {
    this.form = this.fb.group({
      phone: [this.user.phone || '', [Validators.required]],
      email: [this.user.email || '', [Validators.required]],
      permissions: [this.user.permissions || []],
    });
    this.isLoading = false;
  }

  onSubmit() {
    Object.assign(this.user, this.form.value);
    if (this.isCreation) {
      this.userService.create(this.user).then(() => this.location.back());
    } else {
      this.userService.edit(this.user).then(() => this.location.back());
    }
  }
}

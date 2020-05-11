import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NavbarService} from '../../core/navbar/navbar.service';
import {User} from '../../models/user.model';
import {Location} from '@angular/common';
import {AuthService} from '../../auth/auth.service';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class UserEditComponent implements OnInit {

  isCreation: boolean;
  user: User;
  form: FormGroup;
  uploading = 0;
  isLoading = true;

  constructor(
    public userService: UserService,
    public route: ActivatedRoute,
    public navbarService: NavbarService,
    public fb: FormBuilder,
    public location: Location,
    public router: Router,
    public authService: AuthService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.isCreation = !id;
      this.navbarService.updateNavbar(this.isCreation ? 'New user' : 'Edit user', null, '', null, [], null, () => this.location.back());

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
      name: [this.user.name || '', [Validators.required]],
      phone: [this.user.phone || ''],
      email: [this.user.email || ''],
      image: [this.user.image || ''],
      description: [this.user.description || ''],
      verified: [this.user.verified || false, [Validators.required]],
      level: [this.user.level || 'level1', [Validators.required]],
      permissions: [this.user.permissions || []],
    });
    this.isLoading = false;
  }

  onSubmit() {
    this.authService.getToken().then(() => {
      Object.assign(this.user, this.form.value);
      if (this.isCreation) {
        this.userService.create(this.user).then(() => this.location.back());
      } else {
        this.userService.edit(this.user).then(() => this.location.back());
      }
    });
  }
}

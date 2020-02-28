import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {User} from '../../models/user.model';
import {NavbarService} from '../../core/navbar/navbar.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  isLoading = false;
  isError = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private navbarService: NavbarService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Login');
    this.authService.getToken().then(token => {
      if (token) {
        this.router.navigate(['/']);
      }
    });
  }

  login() {
    this.isError = false;
    if (this.email && this.password) {
      this.isLoading = true;
      this.authService.login(this.email, this.password).then(() => {
        this.isLoading = false;
        this.router.navigate(['/']);
      }).catch(() => {
        this.isError = true;
        this.isLoading = false;
      });
    } else {
      this.isError = true;
    }
  }

}

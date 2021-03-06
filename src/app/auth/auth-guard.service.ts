import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(
      private router: Router,
      private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const permRequired: string = route.data.permission;

    return this.authService.getToken().then(token => {
      if (token && (!permRequired || this.authService.hasPerm(permRequired))) {
        return new Promise(r => r(true));
      } else {
        this.router.navigate(['/', 'auth']);
        return new Promise(r => r(false));
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {environment as env} from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  users: Array<User>;

  async search(query: string = '') {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'user/', {params: {query: query}}).subscribe((data: Array<User>) => {
        this.users = data;
        resolve();
      });
    });
  }

  async get(id: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'user/' + id).subscribe((user: User) => resolve(user));
    });
  }

  async register(email: string, password: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'auth/register', {email, password}).subscribe((data: any) => resolve(data.user._id));
    });
  }

  async create(user: User) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'user/', user).subscribe((data: User) => resolve(data));
    });
  }

  async edit(user: User) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'user/' + user._id, user).subscribe(() => resolve());
    });
  }

  getLevelName(level: string) {
    return level === 'level1' ? 'Newbie'
      : level === 'level2' ? 'Well-versed'
      : level === 'level3' ? 'News-buff'
      : 'Error';
  }
}

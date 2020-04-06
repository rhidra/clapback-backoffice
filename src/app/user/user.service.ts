import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  users: Array<User>;

  search(query: string = '') {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'user/', {params: {query: query}}).subscribe((data: Array<User>) => {
        this.users = data;
        resolve();
      });
    });
  }

  get(id: string) {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'user/' + id).subscribe((user: User) => resolve(user));
    });
  }

  create(user: User) {
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'user/', user).subscribe((data: User) => resolve(data));
    });
  }

  edit(user: User) {
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

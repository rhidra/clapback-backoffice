import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

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
      this.http.get('http://localhost:9000/user/', {params: {query: query}}).subscribe((data: Array<User>) => {
        this.users = data;
        resolve();
      });
    });
  }

  get(id: string) {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/user/' + id).subscribe((user: User) => resolve(user));
    });
  }

  create(user: User) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/user/', user).subscribe((data: User) => resolve(data));
    });
  }

  edit(user: User) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/user/' + user._id, user).subscribe(() => resolve());
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import {NewsGroup} from '../models/newsgroup.model';
import {NewsItem} from '../models/newsitem.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient,
  ) { }

  users: Array<User>;

  load() {
    return new Promise(resolve => {
      this.http.get('assets/MOCK_DATA.json').subscribe((data: Array<User>) => {
        this.users = data;
        resolve();
      });
    });
  }

  get(id: string) {
    return new Promise(resolve => {
      this.http.get('assets/MOCK_DATA.json').subscribe((users: Array<User>) => {
        resolve(users.find(user => user._id === id));
      });
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

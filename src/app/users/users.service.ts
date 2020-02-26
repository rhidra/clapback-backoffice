import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient,
  ) { }

  users: Array<User>;

  load() {
    return new Promise(resolve => {
      this.http.get('assets/MOCK_DATA.json').subscribe((data: any) => {
        this.users = data;
        resolve();
      });
    });
  }
}

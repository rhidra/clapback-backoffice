import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../models/user.model';
import * as jwt_decode from 'jwt-decode';
import {SESSION_STORAGE, WebStorageService} from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: User;
  refreshToken: string;
  accessToken: string;

  getToken(): Promise<any> {
    return new Promise<string>(resolve => {
      if (!this.isTokenExpired()) { return resolve(this.accessToken); }
      if (!this.user || !this.refreshToken) { return resolve(null); }

      this.http.post('http://localhost:9000/auth/token', {id: this.user._id, refreshToken: this.refreshToken})
          .subscribe((res: any) => {
            this.accessToken = res.token;
            resolve(this.accessToken);
          }, () => resolve(null));
    });
  }

  hasPerm(perm: string) {
    if (!this.user) { return false; }
    return this.user.permissions.includes(perm);
  }

  constructor(
    private http: HttpClient,
    @Inject(SESSION_STORAGE) private storage: WebStorageService,
  ) {
    this.loadFromStorage();
  }

  loadFromStorage(): void {
    this.refreshToken = this.storage.get('refreshToken');
    this.user = this.storage.get('user');
  }

  isTokenExpired(): boolean {
    if (!this.accessToken) { return true; }
    const decoded: any = jwt_decode(this.accessToken);
    if (decoded.exp === undefined) { return false; }
    const date = new Date(0).setUTCSeconds(decoded.exp);
    return !(date.valueOf() > new Date().valueOf());
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http.post('http://localhost:9000/auth/login', {email, password}).subscribe((res: any) => {
        this.refreshToken = res.refreshToken;
        this.user = new User();
        this.user._id = res.id;
        this.user.email = res.email;
        this.user.phone = res.phone;
        this.user.permissions = res.permissions;
        this.accessToken = res.token;
        this.storage.set('refreshToken', this.refreshToken);
        this.storage.set('user', this.user);
        resolve();
      }, reject);
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topic} from '../models/topic.model';
import {environment as env} from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics: Array<Topic> = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  async search(query: string = '') {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'topic/').subscribe((data: any) => {
        this.topics = data;
        resolve();
      });
    });
  }

  async get(id: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'topic/' + id).subscribe(data => resolve(data));
    });
  }

  async create(topic: Topic) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'topic/', topic).subscribe((data: Topic) => {
        resolve(data);
      });
    });
  }

  async edit(topic: Topic) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'topic/' + topic._id, topic).subscribe((data: Topic) => {
        Object.assign(this.topics.find(temp => temp._id === topic._id) || {}, topic);
        resolve(data);
      });
    });
  }

  async delete(topic: Topic) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'topic/' + topic._id).subscribe(data => {
        this.topics = this.topics.filter(t => t._id !== topic._id);
        resolve(data);
      });
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Topic} from '../models/topic.model';

@Injectable({
  providedIn: 'root'
})
export class TopicService {

  topics: Array<Topic> = [];

  constructor(
    private http: HttpClient,
  ) { }

  search(query: string = '') {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/topic/').subscribe((data: any) => {
        this.topics = data;
        resolve();
      });
    });
  }

  get(id: string) {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/topic/' + id).subscribe(data => resolve(data));
    });
  }

  create(topic: Topic) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/topic/', topic).subscribe((data: Topic) => {
        resolve(data);
      });
    });
  }

  edit(topic: Topic) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/topic/' + topic._id, topic).subscribe((data: Topic) => {
        Object.assign(this.topics.find(temp => temp._id === topic._id), topic);
        resolve(data);
      });
    });
  }

  delete(topic: Topic) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:9000/topic/' + topic._id).subscribe(data => {
        this.topics = this.topics.filter(t => t._id !== topic._id);
        resolve(data);
      });
    });
  }
}

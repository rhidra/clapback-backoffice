import { Injectable } from '@angular/core';
import {NewsGroup} from '../models/newsgroup.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  groups: Array<NewsGroup>;

  constructor(
    private http: HttpClient,
  ) { }

  load() {
    return this.search('');
  }

  search(query: string) {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/news/group?all=true').subscribe((data: any) => {
        this.groups = data;
        resolve();
      });
    });
  }

  get(id: string) {
    return new Promise(resolve => {
      this.http.get('http://localhost:9000/news/group/' + id).subscribe(data => resolve(data));
    });
  }

  create(group: NewsGroup) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/news/group', group).subscribe(data => resolve(data));
    });
  }

  edit(group: NewsGroup) {
    return new Promise(resolve => {
      this.http.post('http://localhost:9000/news/group/' + group._id, group).subscribe(data => resolve(data));
    });
  }

  delete(group: NewsGroup) {
    return new Promise(resolve => {
      this.http.delete('http://localhost:9000/news/group/' + group._id).subscribe(data => {
        this.groups = this.groups.filter(g => g !== group);
        resolve(data);
      });
    });
  }
}

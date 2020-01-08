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
}

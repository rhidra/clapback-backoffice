import { Injectable } from '@angular/core';
import {NewsGroup} from '../models/newsgroup.model';
import {HttpClient} from '@angular/common/http';
import {NewsItem} from '../models/newsitem.model';

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
      const items = group.items;
      delete group.items;
      const promises: Array<Promise<any>> = [];
      this.http.post('http://localhost:9000/news/group', group).subscribe((data: NewsGroup) => {
        items.forEach(item => promises.push(new Promise(r => {
          item.group = data._id;
          this.http.post('http://localhost:9000/news/item', item).subscribe(() => r());
        })));
        Promise.all(promises).then(() => resolve());
      });
    });
  }

  edit(group: NewsGroup, rejectedItems: Array<NewsItem> = []) {
    const items = group.items;
    delete group.items;
    const promises: Array<Promise<any>> = [];
    promises.push(new Promise(r => this.http.post('http://localhost:9000/news/group/' + group._id, group).subscribe(() => r())));
    items.forEach(item => promises.push(new Promise(r => {
      item.group = group._id;
      if (item._id) {
        this.http.post('http://localhost:9000/news/item/' + item._id, item).subscribe(() => r());
      } else {
        this.http.post('http://localhost:9000/news/item', item).subscribe(() => r());
      }
    })));
    rejectedItems.forEach(item => promises.push(new Promise(r => {
      this.http.delete('http://localhost:9000/news/item/' + item._id).subscribe(() => r());
    })));
    return Promise.all(promises);
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

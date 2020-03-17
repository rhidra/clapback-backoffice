import { Injectable } from '@angular/core';
import {Reaction} from '../models/reaction.model';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  reactions: Array<Reaction> = [];

  constructor(
    private http: HttpClient,
  ) { }

  searchVideo(query: string = ''): Promise<Array<Reaction>> {
    return new Promise<Array<Reaction>>(resolve => {
      this.http.get(env.apiUrl + 'reaction', {params: {populate: true, type: 'video'} as any}).subscribe((data: any) => {
        this.reactions = data;
        resolve(this.reactions);
      });
    });
  }

  get(id: string): Promise<Reaction> {
    return new Promise<Reaction>(resolve => {
      const reaction = this.reactions.find(r => r._id === id);
      if (reaction) {
        return resolve(reaction);
      } else {
        this.http.get(env.apiUrl + 'reaction/' + id).subscribe((data: any) => {
          resolve(data);
        });
      }
    });
  }
}

import { Injectable } from '@angular/core';
import {Reaction} from '../models/reaction.model';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReactionService {

  reactions: Array<Reaction> = [];

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  async search(query: string = ''): Promise<Array<Reaction>> {
    await this.authService.onAuthenticated(true);
    return new Promise<Array<Reaction>>(resolve => {
      this.http.get(env.apiUrl + 'reaction', {params: {populate: true} as any}).subscribe((data: any) => {
        this.reactions = data;
        resolve(this.reactions);
      });
    });
  }

  async get(id: string): Promise<Reaction> {
    await this.authService.onAuthenticated(true);
    return new Promise<Reaction>(resolve => {
      const reaction = this.reactions.find(r => r._id === id);
      if (reaction) {
        return resolve(reaction);
      } else {
        this.http.get(env.apiUrl + 'reaction/' + id).subscribe((data: any) => resolve(data));
      }
    });
  }

  async remove(id: string): Promise<void> {
    await this.authService.onAuthenticated(true);
    return new Promise<void>(resolve => {
      this.http.delete(env.apiUrl + 'reaction/' + id).subscribe(() => resolve());
    })
  }
}

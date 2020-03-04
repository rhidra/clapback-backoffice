import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Quiz} from '../../models/quiz.model';
import {environment as env} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  constructor(
    private http: HttpClient,
  ) { }

  get(id: string): Promise<Quiz> {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'quiz/' + id).subscribe((data: Quiz) => resolve(data));
    });
  }

  create(quiz: Quiz): Promise<Quiz> {
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'quiz', quiz).subscribe((data: any) => resolve(data));
    });
  }

  edit(quiz: Quiz): Promise<Quiz> {
    return new Promise(resolve => {
      this.http.post(env.apiUrl + 'quiz/' + quiz._id, quiz).subscribe((data: any) => resolve(data));
    });
  }
}

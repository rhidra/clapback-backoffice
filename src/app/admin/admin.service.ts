import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: HttpClient,
  ) { }

  getMediaStats(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/media')
        .subscribe((stats: { medias: Array<string>, thumbnailsSize: number, mediasSize: number }) => resolve(stats));
    });
  }

  emptyThumbnailCache() {
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'admin/thumbnails').subscribe(() => resolve());
    });
  }

  deleteMedia(filename: string) {
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'media/' + filename).subscribe(() => resolve());
    });
  }
}

import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient,
  ) { }

  getStorageStats(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/storage').subscribe((stats: {total: number, used: number}) => resolve(stats));
    });
  }

  getVideosStats(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/media/videos')
        .subscribe((stats: { mp4: Array<string>, hls: Array<string>, thumbnailsSize: number, mp4Size: number, hlsSize: number }) => resolve(stats));
    });
  }

  getImagesStats(): Promise<any> {
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/media/images')
        .subscribe((stats: { images: Array<string>, imageSize: number }) => resolve(stats));
    });
  }

  emptyThumbnailCache() {
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'admin/thumbnails').subscribe(() => resolve());
    });
  }

  removeMP4Video(fileid: string) {
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/video/${fileid}/mp4`).subscribe(() => resolve());
    });
  }

  removeHLSVideo(fileid: string) {
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/video/${fileid}/hls`).subscribe(() => resolve());
    });
  }

  removeImage(filename: string) {
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/image/${filename}`).subscribe(() => resolve());
    });
  }
}

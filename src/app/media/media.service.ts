import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment as env} from '../../environments/environment';
import { resolve } from 'url';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  async getStorageStats(): Promise<any> {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/storage').subscribe((stats: {total: number, used: number}) => resolve(stats));
    });
  }

  async getVideosStats(): Promise<any> {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/media/videos')
        .subscribe((stats: { mp4: Array<string>, hls: Array<string>, thumbnailsSize: number, mp4Size: number, hlsSize: number }) => resolve(stats));
    });
  }

  async getImagesStats(): Promise<any> {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(env.apiUrl + 'admin/media/images')
        .subscribe((stats: { images: Array<string>, size: number }) => resolve(stats));
    });
  }

  async emptyThumbnailCache() {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'admin/thumbnails').subscribe(() => resolve());
    });
  }

  async emptyModifiedImages() {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(env.apiUrl + 'admin/modified-images').subscribe(() => resolve());
    });
  }

  async removeMP4Video(fileid: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/video/${fileid}/mp4`).subscribe(() => resolve());
    });
  }

  async removeHLSVideo(fileid: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/video/${fileid}/hls`).subscribe(() => resolve());
    });
  }

  async removeImage(filename: string) {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.delete(`${env.apiUrl}media/image/${filename}`).subscribe(() => resolve());
    });
  }

  async coherenceCheck(): Promise<any> {
    await this.authService.onAuthenticated(true);
    return new Promise(resolve => {
      this.http.get(`${env.apiUrl}admin/db-check`).subscribe(data => resolve(data as any));
    })
  }
}

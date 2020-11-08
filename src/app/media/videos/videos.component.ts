import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../core/navbar/navbar.service';
import {MediaService} from '../media.service';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './videos.component.html',
})
export class MediaVideosComponent implements OnInit {

  floor = Math.floor;
  isLoading = true;
  host = env.mediaHost;
  videosStats: {mp4, hls, thumbnailsSize, mp4Size, hlsSize};
  storageStats: {total, used};

  constructor(
    public navbarService: NavbarService,
    public mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Video files storage administration');
    this.updateStats();
  }

  async updateStats() {
    this.isLoading = true;
    [this.videosStats, this.storageStats] = await Promise.all([this.mediaService.getVideosStats(), this.mediaService.getStorageStats()])
    this.isLoading = false;
  }

  removeMP4Video(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeMP4Video(media.slice(0, -4));
    this.videosStats.mp4 = this.videosStats.mp4.filter(m => m !== media);
  }

  removeHLSVideo(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeHLSVideo(media);
    this.videosStats.hls = this.videosStats.hls.filter(m => m !== media);
  }

  emptyThumbnailCache() {
    this.mediaService.emptyThumbnailCache().then(() => this.updateStats());
  }
}

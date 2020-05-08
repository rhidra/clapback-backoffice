import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../core/navbar/navbar.service';
import {AdminService} from '../admin.service';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class AdminSearchComponent implements OnInit {

  supportedVideos = ['.mp4'];
  supportedImages = ['.jpg', 'jpeg', '.png', '.bmp', 'tiff', '.gif'];
  floor = Math.floor;
  isLoading = true;
  host = env.mediaHost + '/media/';
  mediaStats: {medias: Array<string>, thumbnailsSize: number, mediasSize: number};
  storageStats: {total: number, used: number};

  constructor(
    public navbarService: NavbarService,
    public adminService: AdminService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Server administration');
    this.updateStats();
  }

  updateStats() {
    this.isLoading = true;
    Promise.all([this.adminService.getMediaStats(), this.adminService.getStorageStats()])
      .then(stats => [this.mediaStats, this.storageStats] = stats)
      .then(() => this.isLoading = false);
  }

  removeMedia(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.adminService.deleteMedia(media);
    this.mediaStats.medias = this.mediaStats.medias.filter(m => m !== media);
  }

  emptyThumbnailCache() {
    this.adminService.emptyThumbnailCache().then(() => this.updateStats());
  }
}

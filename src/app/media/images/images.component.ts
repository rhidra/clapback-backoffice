import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { MediaService } from '../media.service';
import {environment as env} from '../../../environments/environment';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class MediaImagesComponent implements OnInit {

  isLoading = true;
  floor = Math.floor;
  host = env.mediaHost;
  imagesStats: {images, size};

  constructor(
    private navbarService: NavbarService,
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Image files storage administration');
    this.updateStats();
  }

  async updateStats() {
    this.isLoading = true;
    this.imagesStats = await this.mediaService.getImagesStats();
    this.isLoading = false;
  }

  removeImage(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeImage(media);
    this.imagesStats.images = this.imagesStats.images.filter(m => m !== media);
  }

  async emptyModifiedImages() {
    await this.mediaService.emptyModifiedImages();
    this.updateStats();
  }
}

import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { MediaService } from 'src/app/utils/media.service';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
})
export class MediaImagesComponent implements OnInit {

  constructor(
    private navbarService: NavbarService,
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Image files storage administration');
    this.updateStats();
  }

  updateStats() {

  }
}

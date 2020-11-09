import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/core/navbar/navbar.service';
import { MediaService } from '../media.service';
import {environment as env} from '../../../environments/environment';
import * as moment from 'moment';

@Component({
  selector: 'app-check',
  templateUrl: './check.component.html',
})
export class MediaCheckComponent implements OnInit {

  isLoading = false;
  host = env.mediaHost;
  unlinkedHLS = [];
  unlinkedMP4 = [];
  unlinkedImages = [];
  unlinkedTopics = [];
  unlinkedReactions = [];
  unlinkedUsers = [];
  moment = moment;

  constructor(
    private navbarService: NavbarService,
    private mediaService: MediaService,
  ) { }

  ngOnInit() {
    this.navbarService.updateNavbar('Database coherence check');
  }

  async coherenceCheck() {
    this.isLoading = true;
    ({
      unlinkedHLS: this.unlinkedHLS, unlinkedMP4: this.unlinkedMP4, unlinkedImages: this.unlinkedImages,
      unlinkedTopics: this.unlinkedTopics, unlinkedReactions: this.unlinkedReactions, unlinkedUsers: this.unlinkedUsers
    } = await this.mediaService.coherenceCheck());
    this.isLoading = false;
  }

  removeMP4Video(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeMP4Video(media);
    this.unlinkedMP4 = this.unlinkedMP4.filter(m => m !== media);
  }

  removeHLSVideo(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeHLSVideo(media);
    this.unlinkedHLS = this.unlinkedHLS.filter(m => m !== media);
  }

  removeImage(e: Event, media: string) {
    e.preventDefault();
    e.stopImmediatePropagation();

    this.mediaService.removeImage(media);
    this.unlinkedImages = this.unlinkedImages.filter(m => m !== media);
  }
}

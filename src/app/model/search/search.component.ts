import { Component, OnInit } from '@angular/core';
import {NavbarService} from '../../core/navbar/navbar.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
})
export class ModelSearchComponent implements OnInit {
  private isLoading: boolean = true;

  constructor(
    private navbarService: NavbarService,
  ) {
  }

  ngOnInit() {
    this.navbarService.updateNavbar('Modèles', () => {}, 'Ajouter un modèle');
  }

}

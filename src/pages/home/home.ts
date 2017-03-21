import { Component } from '@angular/core';
import { ModalController } from 'ionic-angular';

import { AddPlacePage } from '../add-place/add-place';
import { Place } from '../../models/place';
import { PlaceService } from '../../services/place';
import { PlacePage } from '../place/place';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  addPlacePage = AddPlacePage;
  places: Place[] = [];

  constructor(
    public modalCtrl: ModalController, private placeService: PlaceService) {
  
  }

  onViewDidLoad() {
    this.places = this.placeService.loadPlaces();
    console.log(this.places);
  }

  onOpenPlace(place: Place) {
    const modal = this.modalCtrl.create(PlacePage, {place: Place});
    modal.present();
  }

}

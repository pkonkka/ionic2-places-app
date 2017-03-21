import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Place } from '../../models/place';
import { PlaceService } from '../../services/place';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

  place: Place;
  index: number;

  // ---------------------------------------------------------------
  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private placeService: PlaceService) {

    this.place = this.navParams.get('place');
    this.index = this.navParams.get('index');
  }

  // ---------------------------------------------------------------
  onLeave() {
    this.viewCtrl.dismiss();
  } 


  // ---------------------------------------------------------------
  onDelete() {
    this.placeService.removePlace(this.index);
    this.onLeave();
  }


}

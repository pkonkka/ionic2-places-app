import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Place } from '../../models/place';

@Component({
  selector: 'page-place',
  templateUrl: 'place.html'
})
export class PlacePage {

  place: Place;

  constructor(
    private navParams: NavParams,
    private viewCtrl: ViewController) {

    this.place = navParams.get('place');
  }

  onLeave() {
    this.viewCtrl.dismiss();
  } 

  onDelete() {
    this.onLeave();
  }


}

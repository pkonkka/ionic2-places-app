import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoadingController, ModalController, NavController, ToastController } from 'ionic-angular';
import { Camera, Entry, File, FileError, Geolocation } from 'ionic-native';

import { Location } from '../../models/location';
import { SetLocationPage } from '../set-location/set-location';

import { PlaceService } from '../../services/place';

declare var cordova: any;

@Component({
  selector: 'page-add-place',
  templateUrl: 'add-place.html'
})
export class AddPlacePage {
  location: Location = {
    lat: 40.7624324,
    lng: -73.9759827
  };
  locationIsSet = false;
  imageUrl = '';

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
    private placeService: PlaceService,
    private navCtrl: NavController) {}

  onSubmit(form: NgForm) {

    this.placeService.addPlace(
      form.value.title, 
      form.value.description, 
      this.location, 
      this.imageUrl);
    form.reset();
    
    this.location = {
      lat: 40.7624324,
      lng: -73.9759827
    };
    this.imageUrl = '';
    this.locationIsSet = false;

    console.log('submit: ', this.placeService.loadPlaces());

    // this.navCtrl.pop();
  }

  onOpenMap() {
    const modal = this.modalCtrl.create(SetLocationPage, {location: this.location, isSet: this.locationIsSet});
    modal.present();
    modal.onDidDismiss(
      data => {
        if (data) {
          this.location = data.location;
          this.locationIsSet = true;
        }
      }
    )
  }

  onLocate() {
    const loader = this.loadingCtrl.create({
      content: 'Getting your Location...'
    });
    loader.present();

    Geolocation.getCurrentPosition()
      .then(
        location => {
          loader.dismiss();
          this.location.lat = location.coords.latitude;
          this.location.lng = location.coords.longitude;
          this.locationIsSet = true;
        }
      )
      .catch(
        error => {
          loader.dismiss();
          const toast = this.toastCtrl.create({
            message: 'Could not get your location, please pick manually.',
            duration: 2500
          });
          toast.present();
        }
      );
  }

  onTakePhoto() {
    Camera.getPicture({
      encodingType: Camera.EncodingType.JPEG,
      correctOrientation: true
    })
    .then(
      imageData => {
        const currentName = imageData.replace(/^.*[\\\/]/, '');
        const path = imageData.replace(/[^\/]*$/, '');
        const newFileName = new Date().getUTCMilliseconds() + '.jpg';
        File.moveFile(path, currentName, cordova.file.dataDirectory, newFileName)
          .then(
            (data: Entry) => {
              this.imageUrl = data.nativeURL;
              Camera.cleanup();
            }
          )
          .catch(
            (err: FileError) => {
              this.imageUrl = '';
              const toast = this.toastCtrl.create({
                message: 'Could not save the image. Please try again.',
                duration: 2500
              });
              toast.present();
              Camera.cleanup();
            }
          );
        this.imageUrl = imageData;
      }
    )
    .catch(
      err => {
        const toast = this.toastCtrl.create({
          message: 'Could not take the image. Please try again.',
          duration: 2500
        });
        toast.present();
      }
    );
  }
 

}

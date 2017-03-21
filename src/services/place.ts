import { Location } from '../models/location';
import { Place } from '../models/place';

export class PlaceService {
    private places: Place[] = [];

    addPlace(
        title: string,
        description: string,
        location: Location,
        imageUrl: string) {
        
        const place = new Place(title, description, location, imageUrl);
        this.places.push(place);

        console.log('add place: ', this.places);
    }

    loadPlaces() {
        console.log('get place: ', this.places);
        return this.places.slice();
    }

    removePlace(index: number) {
        console.log('remove place: ', index);        
        this.places.splice(index, 1);
        console.log('remove place: ', this.places);
    }
}
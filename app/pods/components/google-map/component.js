import Ember from 'ember';
import { AUTOCOMPLETE_SERVICE, DIRECTIONS_RENDERER, DIRECTIONS_SERVICE, LOCATIONS } from './constants';
export default Ember.Component.extend({
    map: null,
    latitude: null,
    longitude: null,
    locations: LOCATIONS,
    duration: null,
    distance: null,
    destination: null,
    startPoint: Ember.computed('latitude', 'longitude', function() {
      return new window.google.maps.LatLng(
        this.get('latitude'),
        this.get('longitude'));
    }),
    insertMarker: function(latLong){
      let marker = new window.google.maps.Marker({
          position: latLong,
          map: this.get('map')
      });
      return marker;
    },
    insertSearchBox: function(){
      let defaultBounds = new window.google.maps.LatLngBounds(
        this.get('startPoint'),
        this.get('startPoint')
      );

      let input = document.getElementById('search');

      let searchBox = new window.google.maps.places.SearchBox(input, {
        bounds: defaultBounds
      });

      searchBox.addListener('places_changed', () => {
        let places = searchBox.getPlaces();

        if (places.length === 0) {
          return;
        }

        places.forEach(place => {
          if (!place.geometry) {
            console.log('Returned place contains no geometry');
            return;
          }
          this.set('destination', place.name);
          this.renderDirections(place.name, place.geometry.location);
        });
      });
    },
    insertMap: function() {
      let mapContainer = this.$('.map-canvas')[0];
      let mapOptions = {
        center: this.get('startPoint'),
        zoom: 15,
      };
      this.set('map', new window.google.maps.Map(mapContainer, mapOptions));
      DIRECTIONS_RENDERER.setMap(this.get('map'));
      this.insertMarker(this.get('startPoint'));
      this.insertSearchBox();
    }.on('didInsertElement'),
    renderDirections: function(name, destination) {
      let request = {
        origin: this.get('startPoint'),
        destination: destination,
        travelMode: 'WALKING'
      };
      DIRECTIONS_SERVICE.route(request, (result, status) => {
        if (status === 'OK') {
          DIRECTIONS_RENDERER.setDirections(result);
          this.set('destination', name);
          this.set('duration', result['routes'][0]['legs'][0]['duration']['text']);
          this.set('distance', result['routes'][0]['legs'][0]['distance']['text']);
        }
      });
    },
    actions: {
      getDirections: function(name, address) {
        this.renderDirections(name, address);
      },
      searchPlaces: function() {
        let searchQuery = Ember.$('#search').val();
        let placesService = new window.google.maps.places.PlacesService(this.get('map'));
        AUTOCOMPLETE_SERVICE.getPlacePredictions({ input: searchQuery }, (predictions, status) => {
            if (status === window.google.maps.places.PlacesServiceStatus.OK) {
              let request = {
                placeId: predictions[0].place_id
              };
              placesService.getDetails(request, (place, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                  this.renderDirections(place.name, place.geometry.location);
                }
              });
            }
          }
        );
      }
    }
});

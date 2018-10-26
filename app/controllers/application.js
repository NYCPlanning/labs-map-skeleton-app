import Controller from '@ember/controller';
import { action } from '@ember-decorators/object';
import mapboxgl from 'mapbox-gl';

export default class ApplicationController extends Controller {

  geocodedFeature = null;

  searchTerms = '';

  // layer that appears when user searches a location (geosearch)
  geocodedLayer = {
    type: 'circle',
    paint: {
      'circle-radius': {
        stops: [
          [
            10,
            5,
          ],
          [
            17,
            12,
          ],
        ],
      },
      'circle-color': 'rgba(199, 92, 92, 1)',
      'circle-stroke-width': {
        stops: [
          [
            10,
            20,
          ],
          [
            17,
            18,
          ],
        ],
      },
      'circle-stroke-color': 'rgba(65, 73, 255, 1)',
      'circle-opacity': 0,
      'circle-stroke-opacity': 0.2,
    },
  }

  @action
  handleMapLoad(map) {
    this.set('mapInstance', map);
    window.map = map;

    // Set up controls
    const navigationControl = new mapboxgl.NavigationControl();

    map.addControl(navigationControl, 'top-left');

    // Hide some base map layers
    const basemapLayersToHide = [
      // enter basemaplayers to hide here
    ];
    basemapLayersToHide.forEach(layer => map.removeLayer(layer));

    // Make the water blue
    map.setPaintProperty('water', 'fill-color', '#ccddee');
}

  // action for when a user clicks on a search result from drop down menu
  @action
  handleSearchSelect(result) {
    const mapInstance = this.get('mapInstance');

    // handle address search results
    if (result.type === 'lot') {
      const center = result.geometry.coordinates;
      this.set('geocodedFeature', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: result.geometry,
        },
      });

      // // turn off geolocation if it is on
      // if (this.geoLocateControl._watchState !== 'OFF') {
      //   this.geoLocateControl._onClickGeolocate();
      // }

      // map will center and zoom on the selected search result's location
      if (mapInstance) {
        mapInstance.flyTo({
          center,
          zoom: 15,
        });
      }
    }

      // this is where you will handle other search results --> choose from layer-groups for "layer-group search"
    }

    // this action is used for bbl-lookup --> center and zoom on specified tax lot
    @action
  flyTo(center, zoom) {
    // Fly to the lot
    this.get('map').flyTo({ center, zoom });

    // Turn on the Tax Lots layer group
    this.set('tax-lots', true);
  }

}

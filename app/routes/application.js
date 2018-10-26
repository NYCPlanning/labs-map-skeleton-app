import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';

export default class ApplicationRoute extends Route {

  // set which layer groups appear on the map
  // here you can override defaults (e.g. tooltipable, tooltipTemplate, clickable, and highlightable)
  async model() {
    const layerGroups = await this.store.query('layer-group', {
      'layer-groups': [
        {
        id: 'subway',
        visible: true,
        layers: [{
          tooltipable: false,
        }]
       },
       {
       id: 'floodplain-efirm2007',
       visible: true,
       layers: [{
         highlightable: false,
         tooltipable: false,
       }]
      },
        { id: 'historic-districts',
        visible: true ,
        layers: [{
          tooltipable: true,
        }]
      }
    ],
  });


    return {
      layerGroups,
    }
  }

  @action
  didTransition() {
    next(function() {
      // not supported in IE 11
      window.dispatchEvent(new Event('resize'));
    });
  }
}

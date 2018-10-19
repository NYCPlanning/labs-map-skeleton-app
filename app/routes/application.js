import Route from '@ember/routing/route';
import { action } from '@ember-decorators/object'; // eslint-disable-line
import { next } from '@ember/runloop';

export default class ApplicationRoute extends Route {

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
          tooltipTemplate: 'HELLO',
        }]
      }
    ],
  });

    const exampleIcon = {
      "type": "rectangle",
      "layers": [{
        "fill":"rgba(230, 50, 50, 0.2)",
        "stroke":"rgba(230, 50, 50, 0.6)",
        "stroke-dasharray":"1"
      }]
    };

    return {
      layerGroups,
      exampleIcon,
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

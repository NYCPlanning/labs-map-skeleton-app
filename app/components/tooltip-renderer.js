import Component from '@ember/component';
import { computed } from '@ember-decorators/object';
import { argument } from '@ember-decorators/argument';
import mustache from 'mustache';

// component for adding tooltips on the map when hover over a layer
// tooltips are set in labs-layers-api as tooltipable: true and tooltipTemplate: '{{{example}}}'
// you can change these ^^ for each layer group by setting them in the route (application.js)
// NOTE: if you have already installed mustache or you see it in yarn.lock/package.json, and you are still receiving a mustache error, run "ember install ember-auto-import" in your terminal

export default class TooltipRenderer extends Component {
  @computed('feature', 'template')
  get renderedText() {
    const properties = this.get('feature.properties');
    const template = this.get('template');

    return mustache.render(template, properties);
  }

  @argument
  feature = {}

  @argument
  template = ''
}

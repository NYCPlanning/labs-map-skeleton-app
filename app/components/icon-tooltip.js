import Component from '@ember/component';
import { argument } from '@ember-decorators/argument';

// component for adding tooltips to the application outside of the map
// style changes to this tooltip can be made in style/modules/_m-tooltipster.scss
// appears as a small icon next to text that shows text on mouse hover

export default class InfoTooltip extends Component {
  tagName = 'span'

  // set the text for the tooltip in the template
  @argument
  tip = ''

  // the default icon for the tooltip is font awesome's info-circle, this can be set to a different icon in the template
  @argument
  icon = 'info-circle'
}

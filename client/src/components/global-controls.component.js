import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = themes => ({

})

class GlobalControls extends Component {
  render() {
    return (
      <div class="col s12">
        <label>Gain:</label>
        <div class="input-field">
          <p class="range-field">
            <input type="range" min="0.0" max="100.0" step="{{gainAmount}}" value="gain" />
          </p>
        </div>
      </div>
    )
  }
}

export default GlobalControls;
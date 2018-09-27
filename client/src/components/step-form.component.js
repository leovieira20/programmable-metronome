import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ResolutionOptions from './resolution-options.component';
import { TextField } from '@material-ui/core';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class StepForm extends Component {
  state = {
    tempo: 120,
    beats: 4
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <div className="input-field col s12 m3">
          <TextField
            id="tempo"
            label="Tempo"
            className={classes.textField}
            type="number"
            value={this.state.tempo}
            onChange={this.handleChange('tempo')}
            margin="normal" />
        </div>

        <div className="input-field col s12 m4">
          <ResolutionOptions
            selectedResolutionId="step.resolution.id"
            onResolutionChanged="setResolution($event)">
          </ResolutionOptions>
        </div>

        <div className="input-field col s12 m3">
        <TextField
            id="beats"
            label="Beats"
            className={classes.textField}
            type="number"
            value={this.state.beats}
            onChange={this.handleChange('beats')}
            margin="normal" />          
        </div>
      </div>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
}

export default withStyles(styles)(StepForm);
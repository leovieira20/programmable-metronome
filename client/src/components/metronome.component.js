import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ResolutionOptions from './resolution-options.component';
import Button from '@material-ui/core/Button';
import { playbackStateChannel } from '../domain/entities/bus';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class Metronome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tempo: 0,
      isPlayingStatus: false
    }
  }

  render() {
    const { classes } = this.props;
    const { tempo, isPlayingStatus } = this.state;

    return (
      <div className="card">
        <div className="card-content">
          <div className="row">
            <h1 className="center-align"><span>{tempo}</span>BPM</h1>
          </div>
          <div className="row">
            <label>Tempo:</label>
            <div className="input-field">
              <p className="range-field">
                <input
                  type="range"
                  min="30.0"
                  max="250.0"
                  step="1"
                  onChange={(v) => this.setState({ tempo: v })}
                  value={tempo} />
              </p>
            </div>
          </div>
          <div className="row">
            <div className="input-field">
              <ResolutionOptions
                selectedResolutionId="selectedResolutionId"
                onResolutionChanged="changeResolution($event)" />
            </div>
          </div>
        </div>
        <div className="card-action">
          <Button
            variant="contained"
            color="primary"
            className={classes.button}            
            onClick={this.togglePlaying}>
              {isPlayingStatus ? "stop" : "start"}
          </Button>
        </div>
      </div>
    )
  }

  togglePlaying() {
    playbackStateChannel.next();
  }
}

export default withStyles(styles)(Metronome);

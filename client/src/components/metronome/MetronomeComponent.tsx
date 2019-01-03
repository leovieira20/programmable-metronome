import * as React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import "reflect-metadata";
import { Step } from 'src/domain/entities/Step';
import { ResolutionOptions } from 'src/domain/entities/ResolutionOptions';
import ResolutionOptionsComponent from 'src/components/common/ResolutionOptionsComponent';
import { injectable } from 'inversify';
import { observer } from 'mobx-react';
import { lazyInject } from '../../inversify.config';
import Metronome from '../../domain/entities/Metronome';
import { HotKeys } from "react-hotkeys";
import { SimpleStepProvider } from 'src/domain/entities/step-providers/SimpleStepProvider';

const styles = theme => ({
    card: {
        width: 500
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

@injectable()
@observer
class MetronomeComponent extends React.Component<any, any> {
    @lazyInject(Metronome) private _metronome: Metronome;

    // private _isActive = false;    
    private _tempoAmount = 5;
    private _stepProvider: SimpleStepProvider;
    private resolutionOptions = ResolutionOptions;

    private keymap = {
        'togglePlay': 'space',
        'increaseTempo': [']', '+'],
        'decreaseTempo': ['[', '-'],
        'changeResolution': ['1', '2', '3', '4', '6']
    };

    constructor(props) {
        super(props);

        this.togglePlay = this.togglePlay.bind(this);
        this.setTempo = this.setTempo.bind(this);
        this.increaseTempo = this.increaseTempo.bind(this);
        this.decreaseTempo = this.decreaseTempo.bind(this);
        this.changeResolution = this.changeResolution.bind(this);

        this.state = {
            selectedResolutionId: this.resolutionOptions[0].id,
            isPlaying: this._metronome.isPlaying,
            tempo: this._metronome.tempo
        }

        const initialResolution = this.resolutionOptions.find(x => x.id === this.state.selectedResolutionId)!;
        var step = new Step(this._metronome.tempo, 1, initialResolution);
        this._stepProvider = new SimpleStepProvider(step);
    }

    componentWillMount(): void {
        this._metronome.setStepProvider(this._stepProvider);
    }

    render() {
        const { classes } = this.props;
        const tempo = this.state.tempo;

        const handlers = {
            'togglePlay': this.togglePlay,
            'increaseTempo': this.increaseTempo,
            'decreaseTempo': this.decreaseTempo,
            'changeResolution': this.changeResolution
        };

        return (
            <HotKeys keyMap={this.keymap} handlers={handlers}>
                <Grid container direction="row" justify="center">
                    <Card className={classes.card}>
                        <CardHeader title={`${tempo} BPM`} />
                        <CardContent>
                            <label>Tempo:</label>
                            <div className="input-field">
                                <p className="range-field">
                                    <input
                                        type="range"
                                        min="30.0"
                                        max="250.0"
                                        step="1"
                                        onChange={this.setTempo}
                                        value={tempo} />
                                </p>
                            </div>

                            <ResolutionOptionsComponent
                                selectedResolutionId={this.state.selectedResolutionId}
                                onResolutionChanged={res => this.changeResolution({ key: res })} />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.togglePlay}>
                                {this.state.isPlaying ? "stop" : "start"}
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </HotKeys>
        )
    }

    toggleState(isMetronomeActive: boolean) {
        // this._isActive = isMetronomeActive;
        // if (this._isActive) {
        //   this.metronome.setStepProvider(this);
        // }
    }

    private togglePlay(): void {
        this._metronome.togglePlay();
        this.setState({
            isPlaying: this._metronome.isPlaying
        })
    }

    private setTempo(e: any) {
        this._metronome.tempo = Number(e.target.value);
        this.setState({
            tempo: this._metronome.tempo
        });
    }

    private increaseTempo() {
        this.changeTempoValue(this._tempoAmount);
    }

    private decreaseTempo() {
        this.changeTempoValue(-this._tempoAmount);
    }

    private changeResolution(event: any) {
        const { key } = event;
        const resId = Number(key);
        
        this.setState({
            selectedResolutionId: resId
        });

        const resolution = this.resolutionOptions.find(x => x.id === resId)!;
        this._metronome.resolution = resolution;
    }

    private changeTempoValue(tempoAmount: number) {
        if ((this._metronome.tempo === 30 && tempoAmount < 1) || (this._metronome.tempo === 250 && tempoAmount > 1)) {
            return;
        }

        this._metronome.increaseTempoBy(tempoAmount);
        this.setState({
            tempo: this._metronome.tempo
        });
    }
}

export default withStyles(styles)(MetronomeComponent);
import * as React from 'react';
import { IStepProvider } from 'src/domain/entities/IStepProvider';
import { Step } from 'src/domain/entities/Step';
import { ResolutionOptions } from 'src/domain/entities/ResolutionOptions';
import ResolutionOptionsComponent from 'src/components/common/ResolutionOptionsComponent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { Grid, Card, CardContent, CardActions, CardHeader } from '@material-ui/core';
import { MetronomeStore } from '../../stores/MetronomeStore';
import { injectable } from 'inversify';
import TYPES from '../../ioc/types';
import { observer } from 'mobx-react';
import "reflect-metadata";
import { lazyInject } from '../../inversify.config';
import Metronome from '../../domain/entities/Metronome';
import { HotKeys } from "react-hotkeys";

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
class MetronomeComponent extends React.Component<any, any> implements IStepProvider {
    private _tempoAmount = 5;
    // private _isActive = false;
    private _step: Step;

    @lazyInject(TYPES.MetronomeStore) private _store: MetronomeStore;
    @lazyInject(Metronome) private _metronome: Metronome;

    public selectedResolutionId: number;
    public resolutionOptions = ResolutionOptions;

    private map = {
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
            selectedResolutionId: this.resolutionOptions[0].id
        }
    }

    componentWillMount(): void {
        this._metronome.setStepProvider(this);        
        this._step = new Step(this._store.tempo, 1, this.resolutionOptions.find(x => x.id === this.selectedResolutionId)!);
    }

    render() {
        const { classes } = this.props;
        const tempo = this._store.tempo;

        const handlers = {
            'togglePlay': this.togglePlay,
            'increaseTempo': this.increaseTempo,
            'decreaseTempo': this.decreaseTempo,
            'changeResolution': this.changeResolution
        };

        return (
            <HotKeys keyMap={this.map} handlers={handlers}>
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
                                onResolutionChanged={res => this.changeResolution({ key: res})} />
                        </CardContent>
                        <CardActions>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                onClick={this.togglePlay}>
                                {this._store.isPlaying ? "stop" : "start"}
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

    getNextStep(): Step {
        const s = this._step.getNextStep();
        if (!s) {
            return this._step.getNextStep()!;
        }
        return s;
    }

    private togglePlay(): void {
        this._store.toggleIsPlaying();
    }

    private setTempo(e: any) {
        this._store.setTempo(e.target.value);
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
        
        const resolution = this.resolutionOptions.find(x => x.id === Number(resId))!;

        this.setState({
            selectedResolutionId: resId
        })        

        this._step.setResolution(resolution);        
    }

    private changeTempoValue(tempoAmount: number) {
        if ((this._store.tempo === 30 && tempoAmount < 1) || (this._store.tempo === 250 && tempoAmount > 1)) {
            return;
        }

        this._store.increaseTempoBy(tempoAmount);
        this._step.tempo = this._store.tempo;
    }
}

export default withStyles(styles)(MetronomeComponent);
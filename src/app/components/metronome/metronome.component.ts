import {AfterViewInit, Component, EventEmitter, OnInit, ViewChild} from '@angular/core';
import {Metronome} from '../../lib/metronome';
import {Bus} from '../../lib/Bus';
import {AudioListener} from '../../domain/listeners/audioListener';

@Component({
    selector: 'metronome',
    templateUrl: './metronome.component.template.html',
    providers: [AudioListener, Metronome, Bus]
})
export class MetronomeComponent implements OnInit {
    private _gainAmount = 5;
    private _tempoAmount = 5;

    public tempo: number;
    public isPlaying: boolean;
    public resolution = 4;
    public gain = 100;
    public resolutionOptions: Array<any>;
    public tempoChange = new EventEmitter();
    public isPlayingChange = new EventEmitter();
    public resolutionChange = new EventEmitter();
    public gainChange = new EventEmitter();

    constructor(private metronome: Metronome,
                private audioListener: AudioListener,
                private bus: Bus) {
    }

    ngOnInit(): void {
        this.tempo = this.metronome.tempo;

        this.resolutionOptions = [
            {value: 1, name: 'Quarter notes'},
            {value: 2, name: '8th notes'},
            {value: 3, name: '8th notes triplets'},
            {value: 4, name: '16th notes'},
            {value: 6, name: '16th notes triplets'}
        ];
    }

    public togglePlaying(): void {
        this.isPlaying = !this.isPlaying;
        this.isPlayingChange.next(this.isPlaying);
        this.metronome.play();
    }

    public changeResolution(resolution: number) {
        this.resolution = resolution;
        this.resolutionChange.next(this.resolution);

        const isTriplet = resolution % 3 === 0;
        this.metronome.changeResolution(resolution, isTriplet);
    }

    public increaseTempo() {
        this.changeTempoValue(this._tempoAmount);
    }

    public decreaseTempo() {
        this.changeTempoValue(-this._tempoAmount);
    }

    public increaseGain() {
        this.changeGainValue(this._gainAmount);
    }

    public decreaseGain() {
        this.changeGainValue(-this._gainAmount);
    }

    private changeTempoValue(tempoAmount: number) {
        if ((this.tempo === 30 && tempoAmount < 1) || (this.tempo === 250 && tempoAmount > 1)) {
            return;
        }

        this.tempo += tempoAmount;
        this.tempoChange.next(this.tempo);
        this.metronome.changeTempo(tempoAmount);
    }

    private changeGainValue(amount: number) {
        if ((this.gain === 0 && amount < 1) || (this.gain === 100 && amount > 1)) {
            return;
        }

        this.gain += amount;
        this.gainChange.next(this.gain);

        this.bus.gainChannel.next(amount);
    }
}

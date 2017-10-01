import {Component, EventEmitter, OnInit} from '@angular/core';
import {Metronome} from '../../lib/metronome';
import ResolutionOptions from '../../domain/entities/resolutionOptions';

@Component({
  selector: 'metronome',
  templateUrl: './metronome.component.template.html',
})
export class MetronomeComponent implements OnInit {
  private _tempoAmount = 5;

  public tempo: number;
  public isPlaying: boolean;
  public selectedResolutionId: number;
  public resolutionOptions = ResolutionOptions;
  public tempoChange = new EventEmitter();
  public isPlayingChange = new EventEmitter();

  constructor(private metronome: Metronome) {
  }

  ngOnInit(): void {
    this.tempo = this.metronome.tempo;
    this.selectedResolutionId = this.resolutionOptions[0].id;
  }

  public togglePlaying(): void {
    this.isPlaying = !this.isPlaying;
    this.isPlayingChange.next(this.isPlaying);
    this.metronome.play();
  }

  public changeResolution(resolutionId: number) {
    const resolution = this.resolutionOptions.find(x => x.id === Number(resolutionId));
    this.selectedResolutionId = resolutionId;

    this.metronome.changeResolution(resolution);
  }

  public increaseTempo() {
    this.changeTempoValue(this._tempoAmount);
  }

  public decreaseTempo() {
    this.changeTempoValue(-this._tempoAmount);
  }

  private changeTempoValue(tempoAmount: number) {
    if ((this.tempo === 30 && tempoAmount < 1) || (this.tempo === 250 && tempoAmount > 1)) {
      return;
    }

    this.tempo += tempoAmount;
    this.tempoChange.next(this.tempo);
    this.metronome.changeTempo(tempoAmount);
  }
}

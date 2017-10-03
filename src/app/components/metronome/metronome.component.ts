import {Component, EventEmitter, OnInit} from '@angular/core';
import {Metronome} from '../../lib/metronome';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {IStepProvider} from '../../domain/entities/IStepProvider';
import {Programme} from '../../domain/entities/programme';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.template.html',
})
export class MetronomeComponent implements OnInit, IStepProvider {
  private _tempoAmount = 5;
  private _isActive = false;
  private _stepSetup: Programme;

  public tempo: number;
  public selectedResolutionId: number;
  public resolutionOptions = ResolutionOptions;
  public tempoChange = new EventEmitter();
  public isPlayingStatus: Observable<boolean>;

  constructor(private metronome: Metronome) {
  }

  ngOnInit(): void {
    this.tempo = this.metronome.tempo;
    this.selectedResolutionId = this.resolutionOptions[0].id;
    this.isPlayingStatus = this.metronome.isPlayingStatus;
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  public togglePlaying(): void {
    this.metronome.togglePlay();
  }

  public changeResolution(resolutionId: number) {
    const resolution = this.resolutionOptions.find(x => x.id === Number(resolutionId));
    this.selectedResolutionId = resolutionId;

    this._stepSetup.noteResolution = resolution;
  }

  public increaseTempo() {
    this.changeTempoValue(this._tempoAmount);
  }

  public decreaseTempo() {
    this.changeTempoValue(-this._tempoAmount);
  }

  getNextStep(): Programme {
    if (this._stepSetup === undefined) {
      this._stepSetup = new Programme(this.tempo, this.resolutionOptions.find(x => x.id === this.selectedResolutionId), 1);
    }

    return this._stepSetup.getNextStep();
  }

  private changeTempoValue(tempoAmount: number) {
    if ((this.tempo === 30 && tempoAmount < 1) || (this.tempo === 250 && tempoAmount > 1)) {
      return;
    }

    this.tempo += tempoAmount;
    this.tempoChange.next(this.tempo);
    this._stepSetup.tempo = this.tempo;
  }
}

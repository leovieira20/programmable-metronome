import {Component, EventEmitter, OnInit} from '@angular/core';
import {Metronome} from '../domain/entities/metronome';
import ResolutionOptions from '../domain/entities/resolutionOptions';
import {IStepProvider} from '../domain/entities/IStepProvider';
import {Observable} from 'rxjs/Observable';
import {Step} from '../domain/entities/Step';

@Component({
  selector: 'app-metronome',
  templateUrl: './metronome.component.template.html',
})
export class MetronomeComponent implements OnInit, IStepProvider {
  private _tempoAmount = 5;
  private _isActive = false;
  private _step: Step;

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
    this._step = new Step(this.tempo, 1, this.resolutionOptions.find(x => x.id === this.selectedResolutionId));
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  togglePlaying(): void {
    this.metronome.togglePlay();
  }

  changeResolution(resolutionId: number) {
    const resolution = this.resolutionOptions.find(x => x.id === Number(resolutionId));
    this.selectedResolutionId = resolutionId;

    this._step.resolution = resolution;
  }

  increaseTempo() {
    this.changeTempoValue(this._tempoAmount);
  }

  decreaseTempo() {
    this.changeTempoValue(-this._tempoAmount);
  }

  getNextStep(): Step {
    const s = this._step.getNextStep();
    if (!s) {
      return this._step.getNextStep();
    }
    return s;
  }

  private changeTempoValue(tempoAmount: number) {
    if ((this.tempo === 30 && tempoAmount < 1) || (this.tempo === 250 && tempoAmount > 1)) {
      return;
    }

    this.tempo += tempoAmount;
    this.tempoChange.next(this.tempo);
    this._step.tempo = this.tempo;
  }
}

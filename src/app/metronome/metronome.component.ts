import {Component, EventEmitter, OnInit} from '@angular/core';
import {Metronome} from '../domain/entities/metronome';
import ResolutionOptions from '../domain/entities/resolutionOptions';
import {IStepProvider} from '../domain/entities/IStepProvider';
import {Observable} from 'rxjs/Observable';
import {Step} from '../domain/entities/step';
import {Bus} from '../domain/entities/bus';

@Component({
  selector: 'app-metronome',
  template: `
    <div class="card">
      <div class="card-content">
        <div class="row">
          <h1 class="center-align"><span>{{tempo}}</span>BPM</h1>
        </div>
        <div class="row">
          <label>Tempo:</label>
          <div class="input-field">
            <p class="range-field">
              <input type="range" min="30.0" max="250.0" step="1" [(value)]="tempo">
            </p>
          </div>
        </div>
        <div class="row">
          <div class="input-field">
            <app-resolution-options
              [selectedResolutionId]="selectedResolutionId"
              (onResolutionChanged)="changeResolution($event)">
            </app-resolution-options>
          </div>
        </div>
      </div>
      <div class="card-action">
        <a
          class="waves-effect waves-light btn-large"
          (click)="togglePlaying()">
          {{(isPlayingStatus | async) ? "stop" : "start"}}
        </a>
      </div>
    </div>

  `
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

  constructor(private metronome: Metronome,
              private bus: Bus) {
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
    this.bus.playbackStateChannel.next();
  }

  changeResolution(resolutionId: number) {
    const resolution = this.resolutionOptions.find(x => x.id === Number(resolutionId));
    this.selectedResolutionId = resolutionId;

    this._step.beats = resolution.beatMultiplier;
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

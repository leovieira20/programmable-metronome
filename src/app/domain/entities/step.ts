import {NoteResolution} from './noteResolution';
import {AccentType} from './accentType';
import ResolutionOptions from "./resolutionOptions";

const uuid = require('uuid/v1');

export class Step {
  private _currentBeat = 0;

  isActive: boolean;
  resolutionId: string;
  tempoModifier: number;
  accentType: any;

  static createBasicStep(): Step {
    const s = new Step(120, 4, ResolutionOptions[0]);
    s.id = null;

    return s;
  }

  constructor(public tempo: number,
              public beats: number,
              public resolution: NoteResolution,
              public tempoLock: boolean = false,
              public id: string = null) {
    this.id = id || uuid();
  }

  getNextStep(tempoModifier: number = 100): Step {
    this._currentBeat++;
    this.tempoModifier = tempoModifier;
    this.accentType = this.defineAccentType();

    if (this._currentBeat === 1) {
      this.isActive = true;
    } else if (this._currentBeat > this.beats) {
      this.resetToInitialState();
      return null;
    }

    return this;
  }

  toggleTempoLock() {
    this.tempoLock = !this.tempoLock;
  }

  getStepInMS(): number {
    const noteResolution = this.resolution;
    const millisecondsPerBeat = 60 / this.tempo;
    const tripletCalculation = (millisecondsPerBeat * noteResolution.duration) * (noteResolution.isTriplet ? 0.67 : 1);
    return this.tempoLock ? tripletCalculation : tripletCalculation / (this.tempoModifier / 100);
  }

  reset() {
    this.resetToInitialState();
  }

  private defineAccentType() {
    if (this._currentBeat === 1) {
      return AccentType.BEAT_HEAD;
    } else {
      return AccentType.SUB_BEAT;
    }
  }

  private resetToInitialState() {
    this.isActive = false;
    this._currentBeat = 0;
  }
}

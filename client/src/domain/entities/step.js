import { NoteResolution } from './noteResolution';
import { AccentType } from './accentType';
import ResolutionOptions from "./resolutionOptions";

const uuid = require('uuid/v1');

export default class Step {
  _currentBeat = 0;

  isActive;
  resolutionId;
  tempoModifier;
  accentType;

  static createBasicStep() {
    const s = new Step(120, 4, ResolutionOptions[0]);
    s.id = null;

    return s;
  }

  constructor(
    tempo,
    beats,
    resolution,
    tempoLock = false,
    id = null) {
    this.id = id || uuid();
  }

  getNextStep(tempoModifier = 100) {
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

  getStepInMS() {
    const noteResolution = this.resolution;
    const millisecondsPerBeat = 60 / this.tempo;
    const tripletCalculation = (millisecondsPerBeat * noteResolution.duration) * (noteResolution.isTriplet ? 0.67 : 1);
    return this.tempoLock ? tripletCalculation : tripletCalculation / (this.tempoModifier / 100);
  }

  reset() {
    this.resetToInitialState();
  }

  defineAccentType() {
    if (this._currentBeat === 1) {
      return AccentType.BEAT_HEAD;
    } else {
      return AccentType.SUB_BEAT;
    }
  }

  resetToInitialState() {
    this.isActive = false;
    this._currentBeat = 0;
  }
}

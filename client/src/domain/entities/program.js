export default class Program {
  _tempoModifier;
  _activeStepIx = 0;

  id;
  name;
  steps = [];

  constructor() {
    this.tempoModifier = 100;
  }

  addStep(s) {
    this.steps.push(s);
  }

  getNextStep() {
    if (this._activeStepIx > this.steps.length - 1) {
      this._activeStepIx = 0;
    }

    const step = this.steps[this._activeStepIx].getNextStep(this.tempoModifier);
    if (step) {
      return step;
    }

    this._activeStepIx++;
    return this.getNextStep();
  }

  reset() {
    this._activeStepIx = 0;
    this.steps.find(x => x.isActive).reset();
  }

  updateStep(s) {
    const oldStep = this.steps.find(x => x.id === s.id);

    oldStep.tempo = s.tempo;
    oldStep.beats = s.beats;
    oldStep.resolution = s.resolution;
  }

  set tempoModifier(t) {
    if (t >= 20 && t <= 300) {
      this._tempoModifier = t;
    }
  }

  get tempoModifier() {
    return this._tempoModifier;
  }
}

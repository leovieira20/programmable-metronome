import {Step} from './Step';
import {Setup} from './Setup';

export class Program {
  private _tempoModifier: number;
  id: string;
  name: string;
  steps: Step[] = [];

  constructor() {
    this.tempoModifier = 100;
  }

  addStep(s: Step) {
    this.steps.push(s);
  }

  getCurrentSetup(): Setup {
    if (this.steps.length === 0) {
      return null;
    }

    let activeStep = this.steps.find(x => x.isActive);
    if (!activeStep) {
      this.steps[0].isActive = true;
      activeStep = this.steps[0];
    } else {
      if (!activeStep.hasNextSetup()) {
        if (this.steps.length > 1) {
          activeStep.isActive = false;
          if (this.steps.indexOf(activeStep) === (this.steps.length - 1)) {
            activeStep = this.steps[0];
            activeStep.isActive = true;
          } else {
            const nextIndex = this.steps.indexOf(activeStep) + 1;
            activeStep = this.steps[nextIndex];
            activeStep.isActive = true;
          }
        }
      }
    }

    return activeStep.getNextSetup(this.tempoModifier / 100);
  }

  set tempoModifier(t: number) {
    if (t < 20) {
      t = 20;
    } else if (t > 300) {
      t = 300;
    }

    this._tempoModifier = t;
  }

  get tempoModifier(): number {
    return this._tempoModifier;
  }
}

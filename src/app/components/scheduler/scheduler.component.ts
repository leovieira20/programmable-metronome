import {Component} from '@angular/core';
import {Programme} from '../../domain/entities/programme';
import {Metronome} from '../../lib/metronome';
import {IStepProvider} from '../../domain/entities/IStepProvider';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements IStepProvider {
  private _isActive = false;
  stepList: Array<Programme> = [];

  constructor(private metronome: Metronome) {
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  public addStep(s: Programme) {
    this.stepList.push(s);
  }

  public getNextStep() {
    let activeSetup = this.stepList.find(x => x.isActive);
    if (activeSetup === undefined) {
      this.stepList[0].isActive = true;
      activeSetup = this.stepList[0];

      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);
      return nextStep;
    }

    if (activeSetup.hasNextStep()) {
      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);

      return nextStep;
    } else {
      if (this.stepList.length > 1) {
        activeSetup.isActive = false;
        if (this.stepList.indexOf(activeSetup) === (this.stepList.length - 1)) {
          activeSetup = this.stepList[0];
          activeSetup.isActive = true;
        } else {
          const nextIndex = this.stepList.indexOf(activeSetup) + 1;
          activeSetup = this.stepList[nextIndex];
          activeSetup.isActive = true;
        }
      }

      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);
      return nextStep;
    }
  }
}

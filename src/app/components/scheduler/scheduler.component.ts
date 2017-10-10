import {Component} from '@angular/core';
import {Metronome} from '../../lib/metronome';
import {IStepProvider} from '../../domain/entities/IStepProvider';
import {Step} from '../../domain/entities/Step';

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements IStepProvider {
  private _isActive = false;
  stepList: Array<Step> = [];

  constructor(private metronome: Metronome) {
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  public addStep(s: Step) {
    this.stepList.push(s);
  }

  public getNextStep() {
    if (this.stepList.length === 0) {
      return null;
    }

    let activeStep = this.stepList.find(x => x.isActive);
    if (!activeStep) {
      this.stepList[0].isActive = true;
      activeStep = this.stepList[0];

      const nextSetup = activeStep.getNextSetup();
      return nextSetup;
    }

    if (activeStep.hasNextSetup()) {
      const nextSetup = activeStep.getNextSetup();
      return nextSetup;
    } else {
      if (this.stepList.length > 1) {
        activeStep.isActive = false;
        if (this.stepList.indexOf(activeStep) === (this.stepList.length - 1)) {
          activeStep = this.stepList[0];
          activeStep.isActive = true;
        } else {
          const nextIndex = this.stepList.indexOf(activeStep) + 1;
          activeStep = this.stepList[nextIndex];
          activeStep.isActive = true;
        }
      }

      return activeStep.getNextSetup();
    }
  }
}

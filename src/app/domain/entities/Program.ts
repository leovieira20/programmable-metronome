import {Step} from './Step';
import {Setup} from './Setup';

export class Program {
  id: string;
  name: string;
  steps: Step[] = [];

  getCurrentSetup(): Setup {
    if (this.steps.length === 0) {
      return null;
    }

    let activeStep = this.steps.find(x => x.isActive);
    if (!activeStep) {
      this.steps[0].isActive = true;
      activeStep = this.steps[0];

      return activeStep.getNextSetup();
    }

    if (activeStep.hasNextSetup()) {
      return activeStep.getNextSetup();
    } else {
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

      return activeStep.getNextSetup();
    }
  }
}

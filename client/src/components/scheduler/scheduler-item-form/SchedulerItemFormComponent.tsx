import * as React from 'react';
//import { Step } from 'src/domain/entities/Step';
import { StepFormComponent } from '../../common/StepFormComponent';

export class SchedulerItemFormComponent extends React.Component {
  stepFormComponent: StepFormComponent;
  onStepCreated: any;

  isFormValid = true;

  render() {
    // return (
    //   <form (submit)="addStep()">
    //   <div class="col s12 no-padding">
    //     <app-step-form (onStepStatusChanged)="reflectToStepStatusChange($event)"></app-step-form>

    //     <div class="input-field col s12 m2">
    //       <button
    //         class="waves-effect waves-light btn"
    //         (click)="addStep()"
    //         [disabled]="!isFormValid">
    //         Add
    //       </button>
    //     </div>
    //   </div>
    // </form>
    // )
    return <div></div>
  }

  reflectToStepStatusChange(isValid: boolean) {
    this.isFormValid = isValid;
  }

  addStep(): boolean {
    this.onStepCreated.emit(this.stepFormComponent.getStep());
    return false;
  }
}

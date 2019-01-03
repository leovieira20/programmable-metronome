import * as React from 'react';
//import { Step } from 'src/domain/entities/Step';
import { StepFormComponent } from '../../common/StepFormComponent';
import { withStyles, Button } from '@material-ui/core';

const styles = theme => ({
  card: {
      width: 500
  },
  button: {
      margin: theme.spacing.unit,
  },
  input: {
      display: 'none',
  },
});

class SchedulerItemFormComponent extends React.Component<any, any> {
  stepFormComponent: StepFormComponent;
  onStepCreated: any;

  isFormValid = true;

  render() {
    return <div></div>;
    // return (
    //   <form onSubmit={this.addStep}>
    //   <div className="col s12 no-padding">
    //     <app-step-form (onStepStatusChanged)="reflectToStepStatusChange($event)"></app-step-form>

    //     <div className="input-field col s12 m2">
    //       <Button
    //         onClick={this.addStep}
    //         disabled={!this.isFormValid}>
    //         Add
    //       </Button>
    //     </div>
    //   </div>
    // </form>
    // )
  }

  reflectToStepStatusChange(isValid: boolean) {
    this.isFormValid = isValid;
  }

  addStep(): boolean {
    this.onStepCreated.emit(this.stepFormComponent.getStep());
    return false;
  }
}

export default withStyles(styles)(SchedulerItemFormComponent);
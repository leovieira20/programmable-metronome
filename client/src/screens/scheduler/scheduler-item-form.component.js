import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';
import StepForm from '../../components/step-form.component';

const styles = themes => ({

})

class SchedulerItemForm extends Component {
  render() {
    return (
      <form submit="addStep()">
        <div className="col s12 no-padding">        
          <StepForm onStepStatusChanged="reflectToStepStatusChange($event)"></StepForm>

          <div className="input-field col s12 m2">
            <Button
              variant="contained"
              color="primary"
              click="addStep()">
              Add
            </Button>
          </div>
        </div>
      </form>
    )
  }
}

export default withStyles(styles)(SchedulerItemForm);
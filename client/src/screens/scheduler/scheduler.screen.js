import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button, TextField } from '@material-ui/core';
import SchedulerItemForm from '../scheduler/scheduler-item-form.component';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },
  dense: {
    marginTop: 19,
  },
  menu: {
    width: 200,
  },
});

class SchedulerScreen extends Component {
  state = {
    globalTempoModifier: 100,
    isBusy: false,
    program: {
      steps: []
    }
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <div className="card">
          <div className="card-content">
            <div className="row">
              <div className="input-field col s7 m10">
                <TextField
                  id="globalTempoModifier"
                  label="Global Tempo Modifier (%)"
                  className={classes.textField}
                  value={this.state.globalTempoModifier}
                  onChange={this.handleChange('globalTempoModifier')}
                  margin="normal"
                />
              </div>
              <div className="input-field col s5 m2">
                <Button
                  variant="contained"
                  color="primary"
                  click="loadProgram()"
                  disabled={this.state.isBusy}>
                  Load Program
              </Button>
              </div>
            </div>

            <div className="row">
              <SchedulerItemForm onStepCreated="addStep($event)"></SchedulerItemForm>
            </div>

            {
              this.state.program.steps > 0 ?
                <div ngIf="program.steps.length > 0">
                  <div className="section">
                    <h5>Steps</h5>
                  </div>

                  <div className="row">
                    <app-scheduler-item-list
                      isBusy="isBusy"
                      program="program"
                      onProgramSaved="saveProgram()">
                    </app-scheduler-item-list>
                  </div>
                </div>
                :
                null
            }

          </div>
        </div>
      </React.Fragment>
    )
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };
}

export default withStyles(styles)(SchedulerScreen)
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = themes => ({

})

class SchedulerList extends Component {
  render() {
    return (
      <React.Fragment>
      <div class="row">
        <div class="col s7 m10">
          <input type="text" ngModel="program.name" />
        </div>
        <div class="col s5 m2">
          <button class="waves-effect waves-light btn" click="saveProgram()" disabled="isBusy || !program.name">
            Save Program
          </button>
        </div>
      </div>

      <div class="row">
        <table class="bordered">
          <thead></thead>
          <tbody>
          <tr ngFor="let s of program.steps" classactive-step="s.isActive">
            <td>
              <app-step-form step="s" onStepChanged="updateStep($event)"></app-step-form>
            </td>
            <td>
              <a href="#" class="secondary-content" click="removeStep(s)">
                <i class="material-icons">delete</i>
              </a>
              <a href="#" class="secondary-content" click="lockTempo(s)">
                <i class="material-icons">{s.tempoLock ? 'lock' : 'lock_open'}</i>
              </a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
      </React.Fragment>
    )
  }
}

export default SchedulerList;
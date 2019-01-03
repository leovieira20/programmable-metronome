import * as React from 'react';
import { Step } from 'src/domain/entities/Step';
import { Program } from 'src/domain/entities/Program';
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

class SchedulerItemListComponent extends React.Component<any, any> {
  program: Program;
  isBusy: boolean;
  onProgramSaved: any;

  render() {
    return <div></div>;
    // return (
    //   <div className="row">
    //     <div className="col s7 m10">
    //       <input type="text">
    //   </div>
    //     <div className="col s5 m2">
    //       <Button className="waves-effect waves-light btn" onClick={this.saveProgram} disabled={this.isBusy || this.!program.name}>
    //         Save Program
    //     </Button>
    //   </div>
    // </div >

    //   <div className="row">
    //     <table className="bordered">
    //       <thead></thead>
    //       <tbody>
    //         <tr>
    //       <td>
    //           <app-step-form step="s" (onStepChanged)="updateStep($event)"></app-step-form>
    //       </td>
    //       <td>
    //         <a href="#" className="secondary-content" onClick={(s) => this.removeStep(s)}>
    //           <i className="material-icons">delete</i>
    //         </a>
    //       <a href="#" className="secondary-content" onClick={(s) => this.lockTempo(s)}>
    //           <i className="material-icons">{{ s.tempoLock ? 'lock' : 'lock_open' }}</i>
    //         </a>
    //       </td>
    //     </tr >
    //     </tbody >
    //   </table >
    // </div >
    // )    
  }

  saveProgram() {
    this.onProgramSaved.next();
  }

  removeStep(s: Step) {
    this.program.steps.splice(this.program.steps.indexOf(s), 1);
  }

  lockTempo(s: Step) {
    s.toggleTempoLock();
  }

  updateStep(s: Step) {
    this.program.updateStep(s);
  }
}

export default withStyles(styles)(SchedulerItemListComponent);
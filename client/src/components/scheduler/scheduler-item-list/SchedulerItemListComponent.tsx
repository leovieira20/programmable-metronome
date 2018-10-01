import * as React from 'react';
import { Step } from 'src/domain/entities/Step';
import { Program } from 'src/domain/entities/Program';

export class SchedulerItemListComponent {
  program: Program;
  isBusy: boolean;
  onProgramSaved: any;

  render() {
    // return (
    //   <div class="row">
    //     <div class="col s7 m10">
    //       <input type="text" [(ngModel)]="program.name">
    //   </div>
    //     <div class="col s5 m2">
    //       <button class="waves-effect waves-light btn" (click)="saveProgram()" [disabled]="isBusy || !program.name">
    //         Save Program
    //     </button>
    //   </div>
    // </div >

    //   <div class="row">
    //     <table class="bordered">
    //       <thead></thead>
    //       <tbody>
    //         <tr *ngFor="let s of program.steps" [class.active-step]="s.isActive">
    //       <td>
    //           <app-step-form [step]="s" (onStepChanged)="updateStep($event)"></app-step-form>
    //       </td>
    //       <td>
    //         <a href="#" class="secondary-content" (click)="removeStep(s)">
    //           <i class="material-icons">delete</i>
    //         </a>
    //       <a href="#" class="secondary-content" (click)="lockTempo(s)">
    //           <i class="material-icons">{{ s.tempoLock ? 'lock' : 'lock_open' }}</i>
    //         </a>
    //       </td>
    //     </tr >
    //     </tbody >
    //   </table >
    // </div >
    // )
    return <div></div>
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

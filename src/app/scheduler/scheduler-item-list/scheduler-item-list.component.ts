import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from '../../domain/entities/step';
import {Program} from '../../domain/entities/program';

@Component({
  selector: 'app-scheduler-item-list',
  template: `
    <div class="row">
      <div class="col s7 m10">
        <input type="text" [(ngModel)]="program.name">
      </div>
      <div class="col s5 m2">
        <button class="waves-effect waves-light btn" (click)="saveProgram()" [disabled]="isBusy || !program.name">
          Save Program
        </button>
      </div>
    </div>

    <div class="row">
      <table class="bordered">
        <thead></thead>
        <tbody>
        <tr *ngFor="let s of program.steps" [class.active-step]="s.isActive">
          <td>
            <app-step-form [step]="s" (onStepChanged)="updateStep($event)"></app-step-form>
          </td>
          <td>
            <a href="#" class="secondary-content" (click)="removeStep(s)">
              <i class="material-icons">delete</i>
            </a>
            <a href="#" class="secondary-content" (click)="lockTempo(s)">
              <i class="material-icons">{{s.tempoLock ? 'lock' : 'lock_open'}}</i>
            </a>
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  `
})
export class SchedulerItemListComponent {
  @Input() program: Program;
  @Input() isBusy: boolean;
  @Output() onProgramSaved = new EventEmitter();

  constructor() {
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

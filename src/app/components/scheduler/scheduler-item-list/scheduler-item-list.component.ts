import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from '../../../domain/entities/Step';
import {Program} from '../../../domain/entities/Program';

@Component({
  selector: 'app-scheduler-item-list',
  template: `
    <div class="row">
      <div class="col s9">
        <input type="text" [(ngModel)]="program.name">
      </div>
      <div class="col s3">
        <button class="waves-effect waves-light btn" (click)="saveProgram()" [disabled]="isBusy || !program.name">Save
          Program
        </button>
      </div>
    </div>

    <div class="row">
      <ul class="collection">
        <li *ngFor="let s of program.steps" class="collection-item" [class.active]="s.isActive">
          <app-scheduler-item
            [step]="s"
            (onStepRemoved)="removeStep($event)">
          </app-scheduler-item>
        </li>
      </ul>
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
}

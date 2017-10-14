import {Component, EventEmitter, Input} from '@angular/core';
import {IProgramRepository} from '../../../domain/services/IProgramRepository';
import {Step} from '../../../domain/entities/Step';
import {IUserRepository} from '../../../domain/services/IUserRepository';
import {MaterializeAction} from 'angular2-materialize';
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
          <app-scheduler-item [step]="s" (onStepRemoved)="removeStep($event)"></app-scheduler-item>
        </li>
      </ul>
    </div>

    <div materialize [materializeParams]="['You need to login to save the program',3000]" [materializeActions]="toastActions"></div>
  `
})
export class SchedulerItemListComponent {
  @Input() program: Program;
  isBusy: boolean;
  toastActions = new EventEmitter<string | MaterializeAction>();

  constructor(private programRepository: IProgramRepository, private userRepository: IUserRepository) {
  }

  saveProgram() {
    if (this.userRepository.getCurrentUser()) {
      this.save();
    } else {
      this.showPleaseLogInToast();
    }
  }

  removeStep(s: Step) {
    this.program.steps.splice(this.program.steps.indexOf(s), 1);
  }

  showPleaseLogInToast() {
    this.toastActions.emit('toast');
  }

  private save() {
    this.isBusy = true;
    this.programRepository.save(this.program, this.userRepository.getCurrentUser()).subscribe(null, error => this.isBusy = false, () => {
      this.program.name = '';
      this.isBusy = false;
    });
  }
}

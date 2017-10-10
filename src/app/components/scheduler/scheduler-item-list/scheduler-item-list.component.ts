import {Component, EventEmitter, Input} from '@angular/core';
import {IProgramRepository} from '../../../domain/services/IProgramRepository';
import {ParseProgramRepository} from '../../../domain/services/ParseProgramRepository';
import {Step} from '../../../domain/entities/Step';
import {IUserRepository} from '../../../domain/services/IUserRepository';
import {MaterializeAction} from 'angular2-materialize';

@Component({
  selector: 'app-scheduler-item-list',
  templateUrl: './scheduler-item-list.component.html',
  providers: [
    {provide: IProgramRepository, useClass: ParseProgramRepository}
  ]
})
export class SchedulerItemListComponent {
  @Input() stepList: Array<Step>;
  programName: string;
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
    this.stepList.splice(this.stepList.indexOf(s), 1);
  }

  showPleaseLogInToast() {
    this.toastActions.emit('toast');
  }

  private save() {
    this.isBusy = true;
    this.programRepository.save({
      name: this.programName,
      steps: this.stepList
    }).subscribe(null, error => this.isBusy = false, () => {
      this.programName = '';
      this.isBusy = false;
    });
  }
}

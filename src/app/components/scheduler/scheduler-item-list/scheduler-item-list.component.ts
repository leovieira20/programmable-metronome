import {Component, EventEmitter, Input} from '@angular/core';
import {IProgramRepository} from '../../../domain/services/IProgramRepository';
import {Step} from '../../../domain/entities/Step';
import {IUserRepository} from '../../../domain/services/IUserRepository';
import {MaterializeAction} from 'angular2-materialize';
import {Program} from '../../../domain/entities/Program';

@Component({
  selector: 'app-scheduler-item-list',
  templateUrl: './scheduler-item-list.component.html'
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

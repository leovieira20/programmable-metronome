import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from '../../../domain/entities/Step';

@Component({
  selector: 'app-scheduler-item',
  templateUrl: './scheduler-item.component.html'
})
export class SchedulerItemComponent {
  @Input() public step: Step;
  @Output() onStepRemoved = new EventEmitter<Step>();

  removeStep(step: Step) {
    this.onStepRemoved.emit(step);
  }
}

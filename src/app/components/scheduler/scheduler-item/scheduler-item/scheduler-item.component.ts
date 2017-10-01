import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Programme} from '../../../../domain/entities/programme';

@Component({
  selector: 'scheduler-item',
  templateUrl: './scheduler-item.component.html'
})
export class SchedulerItemComponent {
  @Input() public step: Programme;
  @Output() onStepRemoved = new EventEmitter<Programme>();

  removeStep(step: Programme) {
    this.onStepRemoved.emit(step);
  }
}

import {Component, Input} from '@angular/core';
import {Programme} from '../../../domain/entities/programme';

@Component({
  selector: 'scheduler-item-list',
  templateUrl: './scheduler-item-list.component.html'
})
export class SchedulerItemListComponent {
  @Input() stepList: Array<Programme>;

  public removeStep(s: Programme) {
    this.stepList.splice(this.stepList.indexOf(s), 1);
  }
}

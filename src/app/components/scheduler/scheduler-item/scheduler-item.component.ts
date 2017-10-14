import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from '../../../domain/entities/Step';

@Component({
  selector: 'app-scheduler-item',
  template: `
    <div>Tempo: {{step.tempo}} Resolution: {{step.resolution.name}} Beats: {{step.beats}}
      <a href="#" class="secondary-content" (click)="removeStep(step)">
        <i class="material-icons">delete</i>
      </a>
    </div>
  `
})
export class SchedulerItemComponent {
  @Input() public step: Step;
  @Output() onStepRemoved = new EventEmitter<Step>();

  removeStep(step: Step) {
    this.onStepRemoved.emit(step);
  }
}

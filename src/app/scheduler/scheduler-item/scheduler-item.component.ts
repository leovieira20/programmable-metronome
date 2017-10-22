import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Step} from '../../domain/entities/step';

@Component({
  selector: 'app-scheduler-item',
  template: `
    <div>Tempo: {{step.tempo}} Resolution: {{step.resolution.name}} Beats: {{step.beats}}
      <a href="#" class="secondary-content" (click)="removeStep(step)">
        <i class="material-icons">delete</i>
      </a>
      <a href="#" class="secondary-content" (click)="lockTempo(step)">
        <i class="material-icons">{{step.tempoLock ? 'lock' : 'lock_open'}}</i>
      </a>
    </div>
  `
})
export class SchedulerItemComponent {
  @Input() public step: Step;
  @Output() onStepRemoved = new EventEmitter<Step>();
  @Output() onTempoLocked = new EventEmitter<Step>();

  removeStep(s: Step) {
    this.onStepRemoved.emit(s);
  }

  lockTempo(s: Step) {
    s.toggleTempoLock();
  }
}

import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Step} from '../../domain/entities/Step';
import {StepFormComponent} from '../../common/step-form/step-form.component';

@Component({
  selector: 'app-scheduler-item-form',
  template: `
    <div class="col s12 no-padding">
      <app-step-form (onStepStatusChanged)="reflectToStepStatusChange($event)"></app-step-form>

      <div class="input-field col s12 m2">
        <button
          class="waves-effect waves-light btn"
          (click)="addStep()"
          [disabled]="!isFormValid">
          Add
        </button>
      </div>
    </div>
  `
})
export class SchedulerItemFormComponent implements OnInit {
  @ViewChild(StepFormComponent)
  stepFormComponent: StepFormComponent;

  @Output() onStepCreated = new EventEmitter<Step>();

  isFormValid = true;

  constructor() {
  }

  ngOnInit(): void {
  }

  reflectToStepStatusChange(isValid: boolean) {
    this.isFormValid = isValid;
  }

  addStep() {
    this.onStepCreated.emit(this.stepFormComponent.getStep());
  }
}
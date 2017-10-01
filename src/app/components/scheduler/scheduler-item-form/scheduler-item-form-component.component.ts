import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import ResolutionOptions from '../../../domain/entities/resolutionOptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Programme} from '../../../domain/entities/programme';

@Component({
  selector: 'scheduler-item-form',
  templateUrl: './scheduler-item-form-component.html'
})
export class SchedulerItemFormComponent implements OnInit {
  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;
  @Output() onStepCreated = new EventEmitter<Programme>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormModel();
  }

  public addStep() {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));
    const p = new Programme(stepForm.tempo, resolution, stepForm.beats);

    this.onStepCreated.emit(p);
  }

  private createFormModel() {
    this.stepForm = this.fb.group({
      tempo: [120, [
        Validators.required,
        Validators.min(30),
        Validators.max(250)
      ]],
      resolution: [ResolutionOptions[0].id, Validators.required],
      beats: [4, [
        Validators.required,
        Validators.min(1)
      ]]
    });
  }
}

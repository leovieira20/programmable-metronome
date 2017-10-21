import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Step} from '../../domain/entities/Step';
import {NoteResolution} from "../../domain/entities/noteResolution";

@Component({
  selector: 'app-scheduler-item-form',
  templateUrl: './scheduler-item-form-component.html'
})
export class SchedulerItemFormComponent implements OnInit {
  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;
  @Output() onStepCreated = new EventEmitter<Step>();

  constructor(private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormModel();
  }

  setResolution(r: NoteResolution) {
    this.stepForm.patchValue({resolution: r});
  }

  public addStep() {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));

    const step = new Step(stepForm.tempo, stepForm.beats, resolution);

    this.onStepCreated.emit(step);
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

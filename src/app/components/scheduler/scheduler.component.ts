import {Component, OnInit} from '@angular/core';
import {Scheduler} from '../../domain/entities/scheduler';
import {Programme} from '../../domain/entities/programme';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements OnInit {
  stepList: Array<Programme> = [];
  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;

  constructor(private scheduler: Scheduler, private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormModel();
  }

  public addStep() {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));
    const p = new Programme(stepForm.tempo, resolution, stepForm.beats);

    this.stepList.push(p);
    this.scheduler.addStep(p);
  }

  public removeStep(i: number) {
    const removedStep = this.stepList.splice(i, 1)[0];
    this.scheduler.removeStep(removedStep);
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

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
  resolution: any;
  programme: Programme;
  resolutionOptions = ResolutionOptions;

  constructor(private scheduler: Scheduler, private fb: FormBuilder) {
  }

  ngOnInit(): void {
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

  public addStep() {
    const stepFromModel = this.stepForm.value;
    const p = new Programme(stepFromModel.tempo, stepFromModel.resolution, false, stepFromModel.beats, 4);

    this.stepList.push(p);
    this.scheduler.addStep(p);
  }

  public removeStep(i: number) {
    this.stepList.splice(i, 1);
  }
}

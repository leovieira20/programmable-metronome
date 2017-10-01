import {Component, OnInit} from '@angular/core';
import {Programme} from '../../domain/entities/programme';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Metronome} from '../../lib/metronome';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements OnInit {
  stepList: Array<Programme> = [];
  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;

  constructor(private metronome: Metronome,
              private fb: FormBuilder) {
    metronome.onRequestForNextStep.subscribe(x => this.getNextStep());
  }

  ngOnInit(): void {
    this.createFormModel();
  }

  public addStep() {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));
    const p = new Programme(stepForm.tempo, resolution, stepForm.beats);

    this.stepList.push(p);
  }

  public removeStep(i: number) {
    this.stepList.splice(i, 1);
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

  private getNextStep() {
    let activeSetup = this.stepList.find(x => x.isActive);
    if (activeSetup === undefined) {
      this.stepList[0].isActive = true;
      activeSetup = this.stepList[0];

      this.metronome.setNextStep(activeSetup.getNextStep());
      return;
    }

    if (activeSetup.hasNextStep()) {
      this.metronome.setNextStep(activeSetup.getNextStep());
    } else {
      if (this.stepList.length > 1) {
        activeSetup.isActive = false;
        if (this.stepList.indexOf(activeSetup) === (this.stepList.length - 1)) {
          activeSetup = this.stepList[0];
          activeSetup.isActive = true;
        } else {
          const nextIndex = this.stepList.indexOf(activeSetup) + 1;
          activeSetup = this.stepList[nextIndex];
          activeSetup.isActive = true;
        }
      }

      this.metronome.setNextStep(activeSetup.getNextStep());
    }
  }
}

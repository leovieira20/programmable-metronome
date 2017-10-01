import {Component, OnInit} from '@angular/core';
import {Programme} from '../../domain/entities/programme';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Metronome} from '../../lib/metronome';
import {IStepProvider} from '../../domain/entities/IStepProvider';

@Component({
  selector: 'scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements OnInit, IStepProvider {
  private _isActive = false;
  stepList: Array<Programme> = [];
  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;

  constructor(private metronome: Metronome,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.createFormModel();
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  public addStep() {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));
    const p = new Programme(stepForm.tempo, resolution, stepForm.beats);

    this.stepList.push(p);
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

  public getNextStep() {
    let activeSetup = this.stepList.find(x => x.isActive);
    if (activeSetup === undefined) {
      this.stepList[0].isActive = true;
      activeSetup = this.stepList[0];

      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);
      return nextStep;
    }

    if (activeSetup.hasNextStep()) {
      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);

      return nextStep;
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

      const nextStep = activeSetup.getNextStep();
      this.metronome.setNextStep(nextStep);
      return nextStep;
    }
  }
}

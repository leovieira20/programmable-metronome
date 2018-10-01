import * as React from 'react';
import { Subscription } from 'rxjs';
import { Step } from 'src/domain/entities/Step';
import { ResolutionOptions } from 'src/domain/entities/ResolutionOptions';
import ResolutionOptionsComponent from 'src/components/common/ResolutionOptionsComponent';
import NoteResolution from 'src/domain/entities/NoteResolution';
export class StepFormComponent extends React.Component {
  private statusChangesSubscription: Subscription;

  step: Step;
  onStepStatusChanged: any;
  onStepChanged: any;

  stepForm: any;
  resolutionOptions = ResolutionOptions;

  componentWillMount(): void {
    this.step = Step.createBasicStep();
    this.createFormModel();
    this.statusChangesSubscription = this.stepForm.statusChanges.subscribe(x => {
      this.onStepStatusChanged.next(x === 'VALID');
    });
    this.stepForm.valueChanges.subscribe(newValues => {
      if (this.stepForm.valid) {
        this.onStepChanged.next(this.getStep());
      }
    });
  }

  render() {
    return (
      <div>
        <div className="input-field col s12 m3">
          <input
            type="number" />
          <label>Tempo</label>
        </div>

        <div className="input-field col s12 m4">
          <ResolutionOptionsComponent
            selectedResolutionId="step.resolution.id"
            onResolutionChanged="setResolution($event)">
          </ResolutionOptionsComponent>
        </div >

        <div className="input-field col s12 m3">
          <label>Beats</label>
          <input
            type="number"
            className="validate" />
        </div>
      </div >
    )
  }

  ngOnDestroy(): void {
    this.statusChangesSubscription.unsubscribe();
  }

  setResolution(r: NoteResolution) {
    this.stepForm.patchValue({ resolution: r });
  }

  getStep(): Step {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution))!;

    return new Step(stepForm.tempo, stepForm.beats, resolution, false, stepForm.id);
  }

  private createFormModel() {
    // this.stepForm = this.fb.group({
    //   id: this.step.id,
    //   tempo: [this.step.tempo, [
    //     Validators.required,
    //     Validators.min(30),
    //     Validators.max(250)
    //   ]],
    //   resolution: [this.step.resolution.id, Validators.required],
    //   beats: [this.step.beats, [
    //     Validators.required,
    //     Validators.min(1)
    //   ]]
    // });
  }
}

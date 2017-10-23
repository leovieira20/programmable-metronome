import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import ResolutionOptions from '../../domain/entities/resolutionOptions';
import {Step} from '../../domain/entities/step';
import {NoteResolution} from '../../domain/entities/noteResolution';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-step-form',
  template: `
    <div [formGroup]="stepForm">
      <div class="input-field col s12 m3">
        <input
          type="number"
          [ngClass]="{'invalid': stepForm.get('tempo').invalid}"
          formControlName="tempo">
        <label>Tempo</label>
      </div>

      <div class="input-field col s12 m4">
        <app-resolution-options
          [selectedResolutionId]="step.resolution.id"
          (onResolutionChanged)="setResolution($event)">
        </app-resolution-options>
      </div>

      <div class="input-field col s12 m3">
        <label>Beats</label>
        <input
          type="number"
          class="validate"
          [ngClass]="{'invalid': stepForm.get('beats').invalid}"
          formControlName="beats">
      </div>
    </div>
  `
})
export class StepFormComponent implements OnInit, OnDestroy {
  private statusChangesSubscription: Subscription;

  @Input() step: Step;
  @Output() onStepStatusChanged = new EventEmitter<boolean>();
  @Output() onStepChanged = new EventEmitter<Step>();

  stepForm: FormGroup;
  resolutionOptions = ResolutionOptions;

  constructor(private fb: FormBuilder) {
    this.step = Step.createBasicStep();
  }

  ngOnInit(): void {
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

  ngOnDestroy(): void {
    this.statusChangesSubscription.unsubscribe();
  }

  setResolution(r: NoteResolution) {
    this.stepForm.patchValue({resolution: r});
  }

  getStep(): Step {
    const stepForm = this.stepForm.value;
    const resolution = this.resolutionOptions.find(x => x.id === Number(stepForm.resolution));

    return new Step(stepForm.tempo, stepForm.beats, resolution, false, stepForm.id);
  }

  private createFormModel() {
    this.stepForm = this.fb.group({
      id: this.step.id,
      tempo: [this.step.tempo, [
        Validators.required,
        Validators.min(30),
        Validators.max(250)
      ]],
      resolution: [this.step.resolution.id, Validators.required],
      beats: [this.step.beats, [
        Validators.required,
        Validators.min(1)
      ]]
    });
  }
}

import {Component, EventEmitter, OnInit} from '@angular/core';
import {Metronome} from '../domain/entities/metronome';
import {IStepProvider} from '../domain/entities/IStepProvider';
import {Step} from '../domain/entities/Step';
import {Router} from '@angular/router';
import {IProgramRepository} from '../domain/services/IProgramRepository';
import {Program} from '../domain/entities/Program';
import {MaterializeAction} from 'angular2-materialize';
import {IUserRepository} from '../domain/services/IUserRepository';

@Component({
  selector: 'app-scheduler',
  template: `
    <div class="card">
      <div class="card-content">
        <div class="row">
          <button class="waves-effect waves-light btn" (click)="loadProgram()" [disabled]="isBusy">Load Program</button>
        </div>

        <div class="row">
          <div class="input-field col s12">
            <input type="number" [(ngModel)]="program.tempoModifier">
            <label>Global Tempo Modifier (%)</label>
          </div>
        </div>

        <div class="row">
          <app-scheduler-item-form (onStepCreated)="addStep($event)"></app-scheduler-item-form>
        </div>

        <div *ngIf="program.steps.length > 0">
          <div class="section">
            <h5>Steps</h5>
          </div>

          <div class="row">
            <app-scheduler-item-list
              [isBusy]="isBusy"
              [program]="program"
              (onProgramSaved)="saveProgram()">
            </app-scheduler-item-list>
          </div>
        </div>
      </div>
    </div>

    <div materialize [materializeParams]="[alertMessage,3000]" [materializeActions]="toastActions"></div>
  `
})
export class SchedulerComponent implements IStepProvider, OnInit {
  private _isActive = false;
  alertMessage: string;
  isBusy: boolean;
  program: Program = new Program();
  toastActions = new EventEmitter<string | MaterializeAction>();

  constructor(private metronome: Metronome,
              private router: Router,
              private programRepository: IProgramRepository,
              private userRepository: IUserRepository) {
  }

  ngOnInit(): void {
    if (this.programRepository.getCurrentProgram()) {
      this.program = this.programRepository.getCurrentProgram();
    }
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  addStep(s: Step) {
    this.program.addStep(s);
  }

  loadProgram() {
    if (!this.userRepository.getCurrentUser()) {
      this.showAlert('You need to login to load a program');
    } else {
      this.router.navigate(['my-programs']);
    }
  }

  saveProgram() {
    if (!this.userRepository.getCurrentUser()) {
      this.showAlert('You need to login to save the program');
    } else {
      this.save();
    }
  }

  getNextStep(): Step {
    return this.program.getNextStep();
  }

  private showAlert(message: string) {
    this.alertMessage = message;
    this.toastActions.emit('toast');
  }

  private save() {
    this.isBusy = true;
    this.programRepository.save(this.program, this.userRepository.getCurrentUser())
      .subscribe(null, error => this.isBusy = false, () => {
        this.isBusy = false;
      });
  }
}

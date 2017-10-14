import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Bus} from '../../domain/entities/Bus';

@Component({
  selector: 'app-global-controls',
  template: `
    <div class="col s3">
      <div class="switch">
        <label>
          Scheduler
          <input type="checkbox" [formControl]="schedulerMode">
          <span class="lever"></span>
          Metronome
        </label>
      </div>

    </div>

    <div class="col s9">
      <label>Gain:</label>
      <div class="input-field">
        <p class="range-field">
          <input type="range" min="0.0" max="100.0" step="{{gainAmount}}" [(ngModel)]="gain">
        </p>
      </div>
    </div>
  `
})
export class GlobalControlsComponent implements OnInit {
  public gainAmount = 5;
  public schedulerMode: FormControl;
  public tempo: number;
  public isPlaying: boolean;
  public resolution = 4;
  public gain = 100;
  @Output() public onToggleScheduler = new EventEmitter<boolean>();

  constructor(private bus: Bus) {
  }

  ngOnInit() {
    this.schedulerMode = new FormControl();
    this.schedulerMode.valueChanges.subscribe(x => this.toggleScheduler(x));
    this.schedulerMode.setValue(true);
  }

  private toggleScheduler(schedulerModeValue: boolean) {
    this.onToggleScheduler.emit(schedulerModeValue);
  }

  changeGainValue(amount: number) {
    if ((this.gain === 0 && amount < 1) || (this.gain === 100 && amount > 1)) {
      return;
    }

    this.gain += amount;
    this.bus.gainChannel.next(amount);
  }
}

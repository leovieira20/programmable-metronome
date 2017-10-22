import {Component, OnInit, ViewChild} from '@angular/core';
import {MetronomeComponent} from '../../metronome/metronome.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Metronome} from '../../domain/entities/metronome';
import {SchedulerComponent} from '../../scheduler/scheduler.component';
import {GlobalControlsComponent} from '../global-controls/global-controls.component';
import {Bus} from "../../domain/entities/bus";

@Component({
  selector: 'app-main',
  providers: [Metronome],
  template: `
    <app-nav-bar></app-nav-bar>
    <div class="row">
      <app-global-controls></app-global-controls>
    </div>
    <div class="row">
      <div class="col s12">
        <ul class="tabs" materialize="tabs">
          <li class="tab col s6">
            <a href="#schedulerTab" (click)="$event.preventDefault();toggleScheduler(false)">Scheduler</a>
          </li>
          <li class="tab col s6">
            <a href="#metronomeTab" (click)="$event.preventDefault();toggleScheduler(true)">Metronome</a>
          </li>
        </ul>
      </div>
      <div id="schedulerTab" class="col s12">
        <app-scheduler></app-scheduler>
      </div>
      <div id="metronomeTab" class="col s12">
        <app-metronome></app-metronome>
      </div>
    </div>

    <hotkeys-cheatsheet></hotkeys-cheatsheet>
  `
})
export class MainComponent implements OnInit {
  @ViewChild(MetronomeComponent)
  private metronomeComponent: MetronomeComponent;
  @ViewChild(SchedulerComponent)
  private schedulerComponent: SchedulerComponent;
  @ViewChild(GlobalControlsComponent)
  private globalControlsComponent: GlobalControlsComponent;

  public gainAmount = 5;
  public tempo: number;
  public resolution = 4;

  constructor(private hotKeys: HotkeysService,
              private bus: Bus) {
  }

  ngOnInit(): void {
    this.configureHotKeys();
    this.toggleScheduler(false);
  }

  toggleScheduler(isMetronomeActive: boolean) {
    this.metronomeComponent.toggleState(isMetronomeActive);
    this.schedulerComponent.toggleState(isMetronomeActive);
  }

  private configureHotKeys() {
    this.hotKeys.add(new Hotkey('space', (): boolean => {
      this.bus.playbackStateChannel.next();
      return false;
    }));

    this.hotKeys.add(new Hotkey(']', (): boolean => {
      this.metronomeComponent.increaseTempo();
      return false;
    }));

    this.hotKeys.add(new Hotkey('[', (): boolean => {
      this.metronomeComponent.decreaseTempo();
      return false;
    }));

    this.hotKeys.add(new Hotkey('up', (): boolean => {
      this.globalControlsComponent.changeGainValue(this.gainAmount);
      return false;
    }));

    this.hotKeys.add(new Hotkey('down', (): boolean => {
      this.globalControlsComponent.changeGainValue(-this.gainAmount);
      return false;
    }));

    this.hotKeys.add(new Hotkey('1', (): boolean => {
      this.metronomeComponent.changeResolution(1);
      return false;
    }));

    this.hotKeys.add(new Hotkey('2', (): boolean => {
      this.metronomeComponent.changeResolution(2);
      return false;
    }));

    this.hotKeys.add(new Hotkey('3', (): boolean => {
      this.metronomeComponent.changeResolution(3);
      return false;
    }));

    this.hotKeys.add(new Hotkey('4', (): boolean => {
      this.metronomeComponent.changeResolution(4);
      return false;
    }));

    this.hotKeys.add(new Hotkey('6', (): boolean => {
      this.metronomeComponent.changeResolution(5);
      return false;
    }));
  }
}

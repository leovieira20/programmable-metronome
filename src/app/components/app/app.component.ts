import {Component, OnInit, ViewChild} from '@angular/core';
import {Bus} from '../../lib/Bus';
import {AudioContextService} from '../../lib/AudioContextService';
import {MetronomeComponent} from '../metronome/metronome.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Metronome} from '../../lib/metronome';
import {AudioListener} from '../../domain/listeners/audioListener';
import {SchedulerComponent} from '../scheduler/scheduler.component';
import {GlobalControlsComponent} from '../global-controls/global-controls.component';
import {environment} from '../../../environments/environment';

const parse = require('parse');

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Bus, Metronome, AudioContextService, AudioListener]
})
export class AppComponent implements OnInit {
  @ViewChild(MetronomeComponent)
  private metronomeComponent: MetronomeComponent;
  @ViewChild(SchedulerComponent)
  private schedulerComponent: SchedulerComponent;
  @ViewChild(GlobalControlsComponent)
  private globalControlsComponent: GlobalControlsComponent;

  public gainAmount = 5;
  public tempo: number;
  public isPlaying: boolean;
  public resolution = 4;

  constructor(private hotKeys: HotkeysService,
              private audioService: AudioContextService,
              private bus: Bus,
              audioListener: AudioListener) {

    parse.initialize(environment.parseAppId);
    parse.serverURL = environment.parseUrl;

    parse.FacebookUtils.init({
      appId      : environment.facebookAppId,
      cookie     : true,
      xfbml      : true,
      version    : 'v2.3'
    });
  }

  ngOnInit(): void {
    this.configureHotKeys();
  }

  public toggleScheduler(schedulerModeValue: boolean) {
    this.metronomeComponent.toggleState(schedulerModeValue);
    this.schedulerComponent.toggleState(schedulerModeValue);
  }

  private configureHotKeys() {
    this.hotKeys.add(new Hotkey('space', (): boolean => {
      this.metronomeComponent.togglePlaying();
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

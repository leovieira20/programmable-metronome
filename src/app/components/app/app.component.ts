import {Component, OnInit, ViewChild} from '@angular/core';
import {Bus} from '../../lib/Bus';
import {AudioContextService} from '../../lib/AudioContextService';
import {Scheduler} from '../../domain/entities/scheduler';
import {MetronomeComponent} from '../metronome/metronome.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';
import {Metronome} from '../../lib/metronome';
import {AudioListener} from '../../domain/listeners/audioListener';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Bus, Metronome, AudioContextService, Scheduler, AudioListener]
})
export class AppComponent implements OnInit {
  private _gainAmount = 5;
  @ViewChild(MetronomeComponent)
  private metronomeComponent;

  public tempo: number;
  public isPlaying: boolean;
  public resolution = 4;
  public gain = 100;

  constructor(private hotKeys: HotkeysService,
              private audioService: AudioContextService,
              private bus: Bus,
              audioListener: AudioListener) {
  }

  ngOnInit(): void {
    this.configureHotKeys();
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
      this.changeGainValue(this._gainAmount);
      return false;
    }));

    this.hotKeys.add(new Hotkey('down', (): boolean => {
      this.changeGainValue(-this._gainAmount);
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

  private changeGainValue(amount: number) {
    if ((this.gain === 0 && amount < 1) || (this.gain === 100 && amount > 1)) {
      return;
    }

    this.gain += amount;
    this.bus.gainChannel.next(amount);
  }
}

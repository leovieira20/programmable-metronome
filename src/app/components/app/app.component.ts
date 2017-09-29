import {Component, OnInit, ViewChild} from '@angular/core';
import {Bus} from '../../lib/Bus';
import {AudioContextService} from '../../lib/AudioContextService';
import {Scheduler} from '../../domain/entities/scheduler';
import {MetronomeComponent} from '../metronome/metronome.component';
import {Hotkey, HotkeysService} from 'angular2-hotkeys';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [Bus, AudioContextService, Scheduler]
})
export class AppComponent implements OnInit {
  @ViewChild(MetronomeComponent)
  private metronomeComponent;
  public tempo: number;
  public isPlaying: boolean;
  public resolution = 4;
  public gain = 100;

  constructor(private hotKeys: HotkeysService) {
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
      this.metronomeComponent.increaseGain();
      return false;
    }));

    this.hotKeys.add(new Hotkey('down', (): boolean => {
      this.metronomeComponent.decreaseGain();
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

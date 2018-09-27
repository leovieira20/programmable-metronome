import { Observable, Subscription } from 'rxjs/Rx';
import { Bus } from './bus';
import { AudioContextService } from './audioContextService';
import { IStepProvider } from './IStepProvider';
import { Subject } from 'rxjs/Subject';
import { Step } from './step';

export class Metronome {
  _tempo = 120.0;
  scheduleAheadTime = 0.1;
  lookahead = 25.0;
  isPlaying = false;
  nextNoteTime;
  tick;
  subscription;
  stepProvider;
  isPlayingStatus = new Subject();

  constructor(
    bus,
    audioContextService) {

    this.tick = Observable.interval(this.lookahead);
    bus.playbackStateChannel.subscribe(() => {
      this.togglePlay();
    });
  }

  togglePlay() {
    if (!this.isPlaying) {
      this.startPlaying();
    } else {
      this.stopPlaying();
    }
  }

  get tempo() {
    return this._tempo;
  }

  setStepProvider(stepProvider) {
    this.stepProvider = stepProvider;
  }

  startPlaying() {
    this.isPlaying = true;
    this.isPlayingStatus.next(true);

    this.nextNoteTime = this.audioContextService.audioContext.currentTime;
    this.subscription = this.tick.subscribe(x => {
      try {
        this.schedule();
      } catch (ex) {
        this.stopPlaying();
      }
    });
  }

  stopPlaying() {
    this.isPlaying = false;
    this.subscription.unsubscribe();
    this.isPlayingStatus.next(false);
  }

  schedule() {
    while (this.nextNoteTime < this.audioContextService.audioContext.currentTime + this.scheduleAheadTime) {
      const s = this.stepProvider.getNextStep();
      if (s === null || s === undefined) {
        throw new Error('Step not defined');
      } else {
        this.bus.tickChannel.next({
          accentType: s.accentType,
          time: this.nextNoteTime
        });

        this.calculateNextNote(s);
      }
    }
  }

  calculateNextNote(programme) {
    this.nextNoteTime += programme.getStepInMS();
  }
}

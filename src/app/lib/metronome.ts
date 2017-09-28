import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {Bus} from './Bus';
import {AudioContextService} from './AudioContextService';
import {AccentType} from '../domain/entities/accentType';
import {NoteResolution} from '../domain/entities/noteResolution';
import {Scheduler} from '../domain/entities/scheduler';
import {Programme} from '../domain/entities/programme';

@Injectable()
export class Metronome {
  private _tempo = 120.0;
  private scheduleAheadTime = 0.1;
  private lookahead = 25.0;
  private beatTimes = 4;
  private isPlaying = false;
  private nextNoteTime: number;
  private tick: Observable<any>;
  private subscription: Subscription;

  constructor(private bus: Bus,
              private audioContextService: AudioContextService,
              private scheduler: Scheduler) {

    this.tick = Observable.interval(this.lookahead);
  }

  public play() {
    this.isPlaying = !this.isPlaying;

    if (this.isPlaying) {
      this.nextNoteTime = this.audioContextService.audioContext.currentTime;
      this.subscription = this.tick.subscribe(x => {
        this.schedule();
      });
    } else {
      this.subscription.unsubscribe();
      this.scheduler.resetSequence();
    }
  }

  public changeTempo(amount: number) {
    this.scheduler.changeTempo(amount);
  }

  public changeResolution(resolution: NoteResolution, isTriplet: boolean = false) {
    this.scheduler.changeResolution(resolution, isTriplet);
  }

  public schedule() {
    while (this.nextNoteTime < this.audioContextService.audioContext.currentTime + this.scheduleAheadTime) {
      const setup = this.scheduler.getNextProgramme();
      this.scheduleNote(setup, this.nextNoteTime);
      this.nextNote(setup.programme);
    }
  }

  private scheduleNote(setup: any, time: number) {
    let accentType: AccentType;
    if (setup.beatNumber % setup.programme.getNumberOfSteps() === 0) {
      accentType = AccentType.BAR_HEAD;
    } else if (setup.beatNumber % this.beatTimes === 0) {
      accentType = AccentType.BEAT_HEAD;
    } else {
      accentType = AccentType.SUB_BEAT;
    }

    this.bus.tickChannel.next({
      accentType: accentType,
      time: time
    });
  }

  private nextNote(programme: Programme) {
    const millisecondsPerBeat = 60 / programme.tempo;
    const millisecondsPerNote = (millisecondsPerBeat * programme.noteResolution) * (programme.isTriplet ? 0.67 : 1);
    this.nextNoteTime += millisecondsPerNote;
  }

  get tempo(): number {
    return this._tempo;
  }
}

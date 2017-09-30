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

  public changeResolution(resolution: NoteResolution) {
    this.scheduler.changeResolution(resolution);
  }

  public schedule() {
    while (this.nextNoteTime < this.audioContextService.audioContext.currentTime + this.scheduleAheadTime) {
      const setup = this.scheduler.getNextProgramme();
      this.bus.tickChannel.next({
        accentType: setup.accentType,
        time: this.nextNoteTime
      });
      this.calculateNextNote(setup);
    }
  }

  private calculateNextNote(programme: Programme) {
    const noteResolution = programme.noteResolution;
    const millisecondsPerBeat = 60 / programme.tempo;
    this.nextNoteTime += (millisecondsPerBeat * noteResolution.duration) * (noteResolution.isTriplet ? 0.67 : 1);
  }

  get tempo(): number {
    return this._tempo;
  }
}

import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {Bus} from './Bus';
import {AudioContextService} from './AudioContextService';
import {Setup} from '../domain/entities/Setup';
import {IStepProvider} from '../domain/entities/IStepProvider';
import {Subject} from 'rxjs/Subject';

@Injectable()
export class Metronome {
  private _tempo = 120.0;
  private scheduleAheadTime = 0.1;
  private lookahead = 25.0;
  private isPlaying = false;
  private nextNoteTime: number;
  private tick: Observable<any>;
  private subscription: Subscription;
  private stepProvider: IStepProvider;
  public isPlayingStatus = new Subject<boolean>();

  constructor(private bus: Bus,
              private audioContextService: AudioContextService) {

    this.tick = Observable.interval(this.lookahead);
  }

  public togglePlay() {
    if (!this.isPlaying) {
      this.startPlaying();
    } else {
      this.stopPlaying();
    }
  }

  get tempo(): number {
    return this._tempo;
  }

  public setStepProvider(stepProvider: IStepProvider) {
    this.stepProvider = stepProvider;
  }

  private startPlaying() {
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

  private stopPlaying() {
    this.isPlaying = false;
    this.subscription.unsubscribe();
    this.isPlayingStatus.next(false);
  }

  private schedule() {
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

  private calculateNextNote(programme: Setup) {
    const noteResolution = programme.noteResolution;
    const millisecondsPerBeat = 60 / programme.tempo;
    this.nextNoteTime += (millisecondsPerBeat * noteResolution.duration) * (noteResolution.isTriplet ? 0.67 : 1);
  }
}

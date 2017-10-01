import {Injectable} from '@angular/core';
import {Observable, Subscription} from 'rxjs/Rx';
import {Bus} from './Bus';
import {AudioContextService} from './AudioContextService';
import {Programme} from '../domain/entities/programme';
import {IStepProvider} from '../domain/entities/IStepProvider';

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

  constructor(private bus: Bus,
              private audioContextService: AudioContextService) {

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
    }
  }

  public schedule() {
    while (this.nextNoteTime < this.audioContextService.audioContext.currentTime + this.scheduleAheadTime) {
      const s = this.stepProvider.getNextStep();
      this.bus.tickChannel.next({
        accentType: s.accentType,
        time: this.nextNoteTime
      });

      this.calculateNextNote(s);
    }
  }

  get tempo(): number {
    return this._tempo;
  }

  setNextStep(s: any) {
  }

  setStepProvider(stepProvider: IStepProvider) {
    this.stepProvider = stepProvider;
  }

  private calculateNextNote(programme: Programme) {
    const noteResolution = programme.noteResolution;
    const millisecondsPerBeat = 60 / programme.tempo;
    this.nextNoteTime += (millisecondsPerBeat * noteResolution.duration) * (noteResolution.isTriplet ? 0.67 : 1);
  }
}

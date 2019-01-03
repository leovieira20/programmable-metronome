import { IStepProvider } from './IStepProvider';
import { MetronomeStore } from '../../stores/MetronomeStore';
import { inject, injectable } from 'inversify';
import TYPES from '../../ioc/types';
import AudioContextService from './AudioContextService';
import { Bus } from './Bus';
import { Observable, Subscription, interval } from 'rxjs';
import { Step } from './Step';
import NoteResolution from './NoteResolution';

@injectable()
export default class Metronome {
  private scheduleAheadTime = 0.1;
  private lookahead = 25.0;
  private nextNoteTime: number;
  private tick: Observable<number>;
  private tickSubscription: Subscription;
  private stepProvider: IStepProvider;  
  private _tempo = 120;

  public isPlaying: boolean = false;

  constructor(
    @inject(Bus) private bus: Bus,
    @inject(TYPES.MetronomeStore) private store: MetronomeStore,
    @inject(AudioContextService) private audioContextService: AudioContextService) {
    this.tick = interval(this.lookahead);
  }

  togglePlay() {
    if (!this.isPlaying) {
      this.startPlaying();
    } else {
      this.stopPlaying();
    }
  }

  get tempo(): number {
    return this._tempo;
  }

  set tempo(value: number) {
    this._tempo = value;
  }

  set resolution(value: NoteResolution) {
    this.stepProvider.setResolution(value);
  }

  increaseTempoBy(amount: number) {
    this.tempo += amount;
    this.stepProvider.setTempo(this.tempo);
  }

  public setStepProvider(stepProvider: IStepProvider) {
    this.stepProvider = stepProvider;
  }

  private startPlaying() {
    this.isPlaying = true;
    this.nextNoteTime = this.audioContextService.audioContext.currentTime;
    this.tickSubscription = this.tick.subscribe(x => {
      try {
        this.schedule();
      } catch (ex) {
        this.stopPlaying();
      }
    });
  }

  private stopPlaying() {
    this.isPlaying = false;
    this.tickSubscription.unsubscribe();    
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

  private calculateNextNote(programme: Step) {
    this.nextNoteTime += programme.getStepInMS();
  }
}

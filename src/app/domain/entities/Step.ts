import {NoteResolution} from './noteResolution';
import {Setup} from './Setup';

export class Step {
  private _setup: Setup;

  isActive: boolean;
  resolutionId: string;
  tempoModifier: number;

  constructor(public tempo: number,
              public beats: number,
              public resolution: NoteResolution,
              public tempoLock: boolean = false) {
    this.createSetup();
  }

  getNextSetup(tempoModifier: number): Setup {
    return this._setup.getNextSetup(tempoModifier);
  }

  hasNextSetup(): boolean {
    return this._setup.hasNextSetup();
  }

  toggleTempoLock() {
    this.tempoLock = !this.tempoLock;
    this._setup.toggleTempoLock();
  }

  private createSetup() {
    this._setup = new Setup(this.tempo, this.resolution, this.beats, this.tempoLock);
  }
}

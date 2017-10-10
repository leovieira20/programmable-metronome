import {NoteResolution} from './noteResolution';
import {Setup} from './Setup';

export class Step {
  private _setup: Setup;

  tempo: number;
  beats: number;
  isActive: boolean;
  resolutionId: string;
  resolution: NoteResolution;

  getNextSetup(): Setup {
    if (!this._setup) {
      this._setup = new Setup(this.tempo, this.resolution, this.beats);
    }

    return this._setup.getNextSetup();
  }

  hasNextSetup(): boolean {
    return this._setup.hasNextSetup();
  }
}

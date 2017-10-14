import {NoteResolution} from './noteResolution';
import {Setup} from './Setup';

export class Step {
  private _setup: Setup;

  tempo: number;
  beats: number;
  isActive: boolean;
  resolutionId: string;
  tempoModifier: number;
  resolution: NoteResolution;

  getNextSetup(tempoModifier: number): Setup {
    this.createSetupIfNotExists();

    return this._setup.getNextSetup(tempoModifier);
  }

  hasNextSetup(): boolean {
    return this._setup.hasNextSetup();
  }

  private createSetupIfNotExists() {
    if (!this._setup) {
      this._setup = new Setup(this.tempo, this.resolution, this.beats);
    }
  }
}

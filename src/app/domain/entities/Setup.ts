import {NoteResolution} from './noteResolution';
import {AccentType} from './accentType';

export class Setup {
  private steps: Array<Setup> = [];

  accentType: AccentType;

  constructor(public tempo: number,
              public noteResolution: NoteResolution,
              public beats: number) {
  }

  getNextSetup(): Setup {
    if (this.steps.length === 0) {
      this.steps = this.makeSetups();
    }

    return this.steps.shift();
  }

  hasNextSetup(): boolean {
    return this.steps.length !== 0;
  }

  private getNumberOfSteps(): number {
    return this.beats * this.noteResolution.beatMultiplier;
  }

  private makeSetups(): Array<Setup> {
    const steps = [];
    for (let i = 0; i < this.getNumberOfSteps(); i++) {
      const accentType = i % this.noteResolution.beatMultiplier === 0 ? AccentType.BEAT_HEAD : AccentType.SUB_BEAT;
      const p = new Setup(this.tempo, this.noteResolution, this.beats);
      p.accentType = accentType;

      steps.push(p);
    }

    return steps;
  }
}

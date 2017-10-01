import {NoteResolution} from './noteResolution';
import {AccentType} from './accentType';

export class Programme {
  private steps: Array<Programme> = [];

  accentType: AccentType;
  isActive: boolean;

  constructor(public tempo: number,
              public noteResolution: NoteResolution,
              public beats: number) {
  }

  getNumberOfSteps(): number {
    return this.beats * this.noteResolution.beatMultiplier;
  }

  getSteps(): Array<Programme> {
    const steps = [];
    for (let i = 0; i < this.getNumberOfSteps(); i++) {
      const accentType = i % this.noteResolution.beatMultiplier === 0 ? AccentType.BEAT_HEAD : AccentType.SUB_BEAT;
      const p = new Programme(this.tempo, this.noteResolution, this.beats);
      p.accentType = accentType;

      steps.push(p);
    }

    return steps;
  }

  getNextStep() {
    if (this.steps.length === 0) {
      this.steps = this.getSteps();
    }

    return this.steps.shift();
  }

  hasNextStep() {
    return this.steps.length !== 0;
  }
}

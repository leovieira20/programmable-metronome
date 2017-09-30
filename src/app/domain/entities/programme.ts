import {NoteResolution} from './noteResolution';
import {AccentType} from './accentType';

export class Programme {
  accentType: AccentType;
  constructor(public tempo: number,
              public noteResolution: NoteResolution,
              public beats: number) {
  }

  getNumberOfSteps(): number {
    return this.beats * this.noteResolution.beatMultiplier;
  }
}

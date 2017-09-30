import {NoteResolution} from './noteResolution';
import {AccentType} from './accentType';

export class Programme {
  constructor(public tempo: number,
              public noteResolution: NoteResolution,
              public beats: number,
              public accentType: AccentType) {
  }

  getNumberOfSteps(): number {
    return this.beats * this.noteResolution.beatMultiplier;
  }
}

import {NoteResolution} from './noteResolution';

export class Programme {
    public beatNumber: number;

    constructor(public tempo: number,
                public noteResolution: NoteResolution,
                public isTriplet: boolean,
                public beatCount: number,
                private beatResolution: number) {
    }

    getNumberOfSteps(): number {
        return this.beatCount * this.beatResolution;
    }
}

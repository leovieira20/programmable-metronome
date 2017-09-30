import {Injectable} from '@angular/core';
import {Programme} from './programme';
import {NoteResolution} from './noteResolution';
import {AccentType} from "./accentType";

@Injectable()
export class Scheduler {
  private programmes: Array<Programme> = [];
  private setupList: Array<Programme> = [];

  public addStep(setup: Programme) {
    this.setupList.push(setup);
    this.createProgrammesFromSetups();
  }

  public getNextProgramme(): any {
    if (this.programmes.length === 0) {
      this.createProgrammesFromSetups();
    }

    return this.programmes.shift();
  }

  public changeTempo(amount: number) {
    const currentSetup = this.setupList[0];
    currentSetup.tempo += amount;

    this.clearSetups();
    this.addStep(currentSetup);
  }

  public changeResolution(noteResolution: NoteResolution) {
    const currentSetup = this.setupList[0];
    currentSetup.noteResolution = noteResolution;

    this.clearSetups();
    this.addStep(currentSetup);
  }

  public resetSequence() {
    this.createProgrammesFromSetups();
  }

  private createProgrammesFromSetups() {
    this.programmes = [];

    for (const setup of this.setupList) {
      const numberOfSteps = setup.getNumberOfSteps();
      for (let i = 0; i < numberOfSteps; i++) {
        const accentType = i % setup.noteResolution.beatMultiplier === 0 ? AccentType.BEAT_HEAD : AccentType.SUB_BEAT;
        const p = new Programme(setup.tempo, setup.noteResolution, setup.beats, accentType);
        this.programmes.push(p);
      }
    }
  }

  private clearSetups() {
    this.setupList = [];
  }
}

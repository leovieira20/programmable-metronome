import {Injectable} from '@angular/core';
import {Programme} from './programme';
import {NoteResolution} from './noteResolution';

@Injectable()
export class Scheduler {
  private programmes: Array<Programme> = [];
  private setupList: Array<Programme> = [];

  public addStep(setup: Programme) {
    this.setupList.push(setup);
    this.createProgrammesFromSetups();
  }

  removeStep(s: Programme) {
    const stepIndex = this.setupList.indexOf(s);
    this.setupList.splice(stepIndex, 1);
    this.createProgrammesFromSetups();
  }

  public getNextProgramme(): Programme {
    if (this.programmes.length === 0) {
      this.createProgrammesFromSetups();
    }

    let activeProgramme = this.programmes.shift();

    const currentActiveStep = this.setupList.find(x => x.isActive);
    if (currentActiveStep === undefined) {
      return activeProgramme;
    }

    activeProgramme = this.setupList.find(x => x.id === activeProgramme.id);
    activeProgramme.isActive = true;

    return activeProgramme;
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
      for (const s of setup.getSteps()) {
        this.programmes.push(s);
      }
    }
  }

  private clearSetups() {
    this.setupList = [];
  }
}

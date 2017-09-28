import {Injectable} from '@angular/core';
import {Programme} from './programme';
import {NoteResolution} from './noteResolution';

@Injectable()
export class Scheduler {
    private programmes: Array<any> = [];
    private setupList: Array<Programme> = [];

    public addProgrammeSetup(setup: Programme) {
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

    }

    public changeResolution(noteResolution: NoteResolution, isTriplet: boolean) {

    }

    public resetSequence() {
        this.createProgrammesFromSetups();
    }

    private createProgrammesFromSetups() {
        this.programmes = [];

        for (const setup of this.setupList) {
            for (let i = 0; i < setup.getNumberOfSteps(); i++) {
                setup.beatNumber = i;
                this.programmes.push({
                    beatNumber: i,
                    programme: setup
                });
            }
        }
    }
}

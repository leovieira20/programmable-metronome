import { IStepProvider } from "../IStepProvider";
import { Step } from '../Step';
import NoteResolution from '../NoteResolution';

export class SimpleStepProvider implements IStepProvider {    
    constructor(private _step: Step) {
    }

    getNextStep(): Step {
        const s = this._step.getNextStep();
        if (!s) {
            return this._step.getNextStep()!;
        }
        return s;
    }

    setResolution(value: NoteResolution) {
        this._step.setResolution(value);
    }
    setTempo(tempo: number) {
        this._step.tempo = tempo;
    }

}
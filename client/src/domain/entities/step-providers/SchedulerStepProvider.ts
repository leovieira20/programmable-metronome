import { IStepProvider } from '../IStepProvider';
import NoteResolution from '../NoteResolution';
import { Step } from '../Step';

export class SchedulerStepProvider implements IStepProvider {    
    setResolution(value: NoteResolution) {
    }

    setTempo(tempo: number) {
    }
    
    getNextStep(): Step {
        throw new Error("Method not implemented.");
    }
}
import { Step } from './Step';
import NoteResolution from './NoteResolution';

export interface IStepProvider {
  setResolution(value: NoteResolution): any;
  setTempo(tempo: number): any;
  getNextStep(): Step;
}

import {Step} from './step';

export interface IStepProvider {
  getNextStep(): Step;
}

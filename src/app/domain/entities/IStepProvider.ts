import {Step} from './Step';

export interface IStepProvider {
  getNextStep(): Step;
}

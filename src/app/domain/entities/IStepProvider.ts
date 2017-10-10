import {Setup} from './Setup';

export interface IStepProvider {
  getNextStep(): Setup;
}

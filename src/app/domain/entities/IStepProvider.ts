import {Programme} from './programme';

export interface IStepProvider {
  getNextStep(): Programme;
}

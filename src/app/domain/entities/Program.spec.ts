import {Step} from './Step';
import {Program} from './Program';
import ResolutionOptions from './resolutionOptions';

describe('Program tests', () => {
  describe('Given getNextStep is being tested', () => {
    it ('When program has two steps with one beat each, should change active steps', () => {
      const firstStep = new Step();
      firstStep.resolution = ResolutionOptions[0];
      firstStep.beats = 1;

      const secondStep = new Step();
      secondStep.resolution = ResolutionOptions[0];
      secondStep.beats = 1;

      const steps = [firstStep, secondStep];
      const program = new Program();

      program.steps = steps;

      expect(firstStep.isActive).toBeFalsy();
      expect(secondStep.isActive).toBeFalsy();

      program.getCurrentSetup();

      expect(firstStep.isActive).toBeTruthy();
      expect(secondStep.isActive).toBeFalsy();

      program.getCurrentSetup();

      expect(firstStep.isActive).toBeFalsy();
      expect(secondStep.isActive).toBeTruthy();
    });
  });
});

import {Step} from './Step';
import {Program} from './Program';
import ResolutionOptions from './resolutionOptions';

describe('Program tests', () => {
  let programWithTwoSteps, firstStep, secondStep;

  beforeEach(() => {
    programWithTwoSteps = new Program();

    firstStep = makeStep();
    secondStep = makeStep();

    const steps = [firstStep, secondStep];

    programWithTwoSteps.steps = steps;
  });

  describe('Given getNextStep is being tested', () => {
    it('When program has two steps with one beat each, should change active steps', () => {
      expect(firstStep.isActive).toBeFalsy();
      expect(secondStep.isActive).toBeFalsy();

      programWithTwoSteps.getCurrentSetup();

      expect(firstStep.isActive).toBeTruthy();
      expect(secondStep.isActive).toBeFalsy();

      programWithTwoSteps.getCurrentSetup();

      expect(firstStep.isActive).toBeFalsy();
      expect(secondStep.isActive).toBeTruthy();
    });
  });

  describe('Given global tempo modifier is being tested', () => {
    it('When global tempo modifier is off, Then step tempo is kept', () => {
      programWithTwoSteps.tempoModifier = 1;

      const setup = programWithTwoSteps.getCurrentSetup().getNextSetup();

      expect(setup.tempo).toBe(firstStep.tempo);
    });

    it('When global modifier is on, Then step tempo is changed', () => {
      programWithTwoSteps.tempoModifier = 0.5;

      const setup = programWithTwoSteps.getCurrentSetup().getNextSetup();

      expect(setup.tempoModifier).toBe(0.5);
    });
  });

  function makeStep() {
    const s = new Step(1, 1, ResolutionOptions[0]);
    return s;
  }
});

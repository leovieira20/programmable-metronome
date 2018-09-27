import { Step } from './step';
import { Program } from './program';
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

      programWithTwoSteps.getNextStep(this.tempoModifier);

      expect(firstStep.isActive).toBeTruthy();
      expect(secondStep.isActive).toBeFalsy();

      programWithTwoSteps.getNextStep(this.tempoModifier);

      expect(firstStep.isActive).toBeFalsy();
      expect(secondStep.isActive).toBeTruthy();
    });
  });

  describe('Given global tempo modifier is being tested', () => {
    it('When global tempo modifier is off, Then step tempo is kept', () => {
      programWithTwoSteps.tempoModifier = 1;

      const step = programWithTwoSteps.getNextStep(this.tempoModifier);

      expect(step.tempo).toBe(firstStep.tempo);
    });

    it('When global modifier is on, Then step tempo is changed', () => {
      programWithTwoSteps.tempoModifier = 50;

      const step = programWithTwoSteps.getNextStep(this.tempoModifier);

      expect(step.tempoModifier).toBe(50);
    });
  });

  describe('Given reset is being tested', () => {
    it('When I reset program, Then next step is the first one', () => {
      secondStep.beats = 2;

      programWithTwoSteps.getNextStep();
      programWithTwoSteps.getNextStep();

      programWithTwoSteps.reset();

      const step = programWithTwoSteps.getNextStep();

      expect(step).toBe(firstStep);
      expect(step.isActive).toBeTruthy();
      expect(secondStep.isActive).toBeFalsy();
    });
  });

  function makeStep() {
    const s = new Step(1, 1, ResolutionOptions[0]);
    return s;
  }
});

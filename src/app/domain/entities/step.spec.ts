import {Step} from './Step';
import ResolutionOptions from './resolutionOptions';
import {AccentType} from './accentType';

describe('Step tests', () => {
  let step: Step;

  describe('Quarter note step', () => {
    beforeEach(() => {
      step = new Step(1, 2, ResolutionOptions[0]);
    });

    it('First beat is beat head', () => {
      const nextStep = step.getNextStep();

      expect(nextStep.accentType).toBe(AccentType.BEAT_HEAD);
    });

    it('Second beat is sub-beat', () => {
      const firstStep = step.getNextStep();
      const secondStep = step.getNextStep();

      expect(secondStep.accentType).toBe(AccentType.SUB_BEAT);
    });
  });

  describe('Eigth note step', () => {
    beforeEach(() => {
      step = new Step(1, 2, ResolutionOptions[1]);
    });

    it('First beat is beat head', () => {
      const nextStep = step.getNextStep();

      expect(nextStep.accentType).toBe(AccentType.BEAT_HEAD);
    });

    it('Second beat is sub-beat', () => {
      const firstStep = step.getNextStep();
      const secondStep = step.getNextStep();

      expect(secondStep.accentType).toBe(AccentType.SUB_BEAT);
    });
  });
});

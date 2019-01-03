import { Step } from "../domain/entities/Step";
import { ResolutionOptions } from '../domain/entities/ResolutionOptions';
import { AccentType } from '../domain/entities/AccentType';

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

    describe('Given Reset is being tested', () => {
        it('When I reset a step with more than one step, Then it should revert to initial state', () => {
            step = new Step(1, 2, ResolutionOptions[0]);

            const s = step.getNextStep();

            expect(step.isActive).toBeTruthy();

            step.reset();

            expect(step.isActive).toBeFalsy();
        });
    });
});

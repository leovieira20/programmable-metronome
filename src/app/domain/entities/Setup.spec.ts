import {Setup} from './Setup';
import ResolutionOptions from './resolutionOptions';

describe('Setup tests', () => {
  const TEMPO = 100;
  const quarterNoteResolution = ResolutionOptions[0];
  const eighthNoteResolution = ResolutionOptions[1];
  const tripletEighthNoteResolution = ResolutionOptions[2];
  const sixteenthNoteResolution = ResolutionOptions[3];
  const tripletSixteenthNoteResolution = ResolutionOptions[4];

  describe('Given getStepInMS is being tested', () => {
    describe('When a non triplet resolution is chosen', () => {
      it('And is a quarter not, And tempo is 100 bpm, Then result should be 0.6 ms', () => {
        const sut = new Setup(TEMPO, quarterNoteResolution);

        const result = sut.getStepInMS();

        expect(result).toBe(0.6);
      });

      it('And is an eighth, And tempo is 100 bpm, Then result should be 0.3 ms', () => {
        const sut = new Setup(TEMPO, eighthNoteResolution);

        const result = sut.getStepInMS();

        expect(result).toBe(0.3);
      });

      it('And is a sixteenth, And tempo is 100 bpm, Then result should be 0.15 ms', () => {
        const sut = new Setup(TEMPO, sixteenthNoteResolution);

        const result = sut.getStepInMS();

        expect(result).toBe(0.15);
      });
    });

    describe('When a triplet resolution is chosen', () => {
      it('And is an eighth note, And tempo is 100 bpm, Then result should be 0.201 ms', () => {
        const sut = new Setup(TEMPO, tripletEighthNoteResolution);

        const result = sut.getStepInMS();

        expect(result).toBe(0.201);
      });

      it('And is a sixteenth note, And tempo is 100 bpm, Then result should be 0.1005 ms', () => {
        const sut = new Setup(TEMPO, tripletSixteenthNoteResolution);

        const result = sut.getStepInMS();

        expect(result).toBe(0.1005);
      });
    });
  });
});

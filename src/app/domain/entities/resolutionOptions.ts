import {NoteResolution} from './noteResolution';

const ResolutionOptions = [
  {id: 1, name: 'Quarter notes', res: NoteResolution.QUARTER, isTriplet: false},
  {id: 2, name: '8th notes', res: NoteResolution.EIGTH, isTriplet: false},
  {id: 3, name: '8th notes triplets', res: NoteResolution.EIGTH, isTriplet: true},
  {id: 4, name: '16th notes', res: NoteResolution.SIXTEENTH, isTriplet: false},
  {id: 5, name: '16th notes triplets', res: NoteResolution.SIXTEENTH, isTriplet: true}
];

export default ResolutionOptions;

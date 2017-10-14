import {NoteResolution} from './noteResolution';

const ResolutionOptions = [
  new NoteResolution(1, 'Quarter notes', 1, 1, false),
  new NoteResolution(2, '8th notes', .5, 2, false),
  new NoteResolution(3, '8th notes triplets', .5, 3, true),
  new NoteResolution(4, '16th notes', .25, 4, false),
  new NoteResolution(5, '16th notes triplets', .25, 6, true)
];

export default ResolutionOptions;

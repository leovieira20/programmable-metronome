export default class NoteResolution {
  constructor(
    public id: number,
    public name: string,
    public duration: number,
    public beatMultiplier: number,
    public isTriplet: boolean) {
  }
}

import { injectable } from 'inversify';

@injectable()
export default class AudioContextService {
    public audioContext: AudioContext = new AudioContext();
}

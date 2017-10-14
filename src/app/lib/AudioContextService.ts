import {Injectable} from '@angular/core';

@Injectable()
export class AudioContextService {
    public audioContext: AudioContext = new AudioContext();
}

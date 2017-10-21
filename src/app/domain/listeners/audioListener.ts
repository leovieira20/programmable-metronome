import {Injectable} from '@angular/core';
import {Bus} from '../entities/Bus';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {AudioContextService} from '../entities/AudioContextService';
import {AccentType} from '../entities/accentType';

@Injectable()
export class AudioListener {
    private gainNode: GainNode;
    private metronomeSounds: Array<any> = [];
    private noteLength = 0.05;

    constructor(private bus: Bus,
                private http: HttpClient,
                private audioContextService: AudioContextService) {
        this.gainNode = this.audioContextService.audioContext.createGain();

        this.loadClickSounds();
        this.subscribeToTickChannel();
        this.subscribeToGainChannel();
    }

    public subscribeToTickChannel() {
        this.bus.tickChannel.subscribe(args => {
            const audioSource = this.audioContextService.audioContext.createBufferSource();

            audioSource.connect(this.gainNode);
            this.gainNode.connect(this.audioContextService.audioContext.destination);

            switch (args.accentType) {
                case AccentType.BAR_HEAD:
                    audioSource.buffer = this.metronomeSounds[0];
                    break;
                case AccentType.BEAT_HEAD:
                    audioSource.buffer = this.metronomeSounds[0];
                    break;
                case AccentType.SUB_BEAT:
                    audioSource.buffer = this.metronomeSounds[1];
                    break;
            }

            audioSource.start(args.time);
            audioSource.stop(args.time + this.noteLength);
        });
    }

    private loadClickSounds(): void {
        Observable.from(['assets/files/cowbell.wav', 'assets/files/fx_clic.wav', 'assets/files/fx_click.wav'])
            .flatMap(x => {
                return this.http.get(x, {
                    responseType: 'arraybuffer'
                });
            })
            .map(x => {
                this.audioContextService.audioContext.decodeAudioData(x, audio => {
                    this.metronomeSounds.push(audio);
                });
            }).subscribe();
    }

    private subscribeToGainChannel() {
        this.bus.gainChannel.subscribe(x => {
            this.gainNode.gain.value += (x / 100);
        });
    }
}

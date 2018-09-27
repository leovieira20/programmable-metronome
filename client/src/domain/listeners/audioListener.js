import { gainChannel } from '../entities/bus';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { AudioContextService } from '../entities/audioContextService';
import { AccentType } from '../entities/accentType';

export class AudioListener {
    gainNode;
    metronomeSounds = [];
    noteLength = 0.05;

    constructor(
        bus,
        http,
        audioContextService) {
        this.gainNode = this.audioContextService.audioContext.createGain();

        this.loadClickSounds();
        this.subscribeToTickChannel();
        this.subscribeToGainChannel();
    }

    subscribeToTickChannel() {
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

    loadClickSounds() {
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

    subscribeToGainChannel() {
        gainChannel.subscribe(x => {
            gainNode.gain.value += (x / 100);
        });
    }
}

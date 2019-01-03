import { Bus } from '../entities/Bus';
import { AccentType } from '../entities/AccentType';
import { injectable, inject } from 'inversify';
import AudioContextService from '../entities/AudioContextService';

@injectable()
export default class AudioListener {
    private gainNode: GainNode;
    private metronomeSounds: Array<any> = [];
    private noteLength = 0.05;

    constructor(
        @inject(Bus) private bus: Bus,
        @inject(AudioContextService) private audioContextService: AudioContextService) {
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
                    audioSource.buffer = this.metronomeSounds[1];
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
        ['/metronome-sounds/cowbell.wav', '/metronome-sounds/fx_clic.wav', '/metronome-sounds/fx_click.wav']
            .map(x => {
                fetch(x)
                    .then(response => response.arrayBuffer())
                    .then(sound => {
                        this.audioContextService.audioContext.decodeAudioData(sound, audio => {
                            this.metronomeSounds.push(audio);
                        });
                    })
            })
    }

    private subscribeToGainChannel() {
        this.bus.gainChannel.subscribe(x => {
            this.gainNode.gain.value += (x / 100);
        });
    }
}

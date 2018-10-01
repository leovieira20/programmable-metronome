import { observable, action } from 'mobx';
import { injectable } from 'inversify';
import "reflect-metadata";

@injectable()
export class MetronomeStore {
    @observable isPlaying = false;
    @observable tempo = 120;

    @action toggleIsPlaying() {
        this.isPlaying = !this.isPlaying;
    }

    @action setTempo(value: number) {
        this.tempo = Number(value);
    }

    @action increaseTempoBy(increaseAmount: number) {
        this.tempo += Number(increaseAmount);
    }
}
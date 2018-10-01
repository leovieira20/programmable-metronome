import { Container } from 'inversify';
import { MetronomeStore } from './stores/MetronomeStore';
import TYPES from './ioc/types';
import getDecorators from 'inversify-inject-decorators';
import Metronome from './domain/entities/Metronome';
import { Bus } from './domain/entities/Bus';
import AudioContextService from './domain/entities/AudioContextService';
import AudioListener from './domain/listeners/AudioListener';

const container = new Container;

container.bind<MetronomeStore>(TYPES.MetronomeStore).to(MetronomeStore).inSingletonScope();
container.bind<Bus>(Bus).toSelf().inSingletonScope();
container.bind<AudioContextService>(AudioContextService).toSelf().inSingletonScope();
container.bind<Metronome>(Metronome).toSelf().inSingletonScope();
container.bind<AudioListener>(AudioListener).toSelf().inSingletonScope();

const { lazyInject } = getDecorators(container);
export { lazyInject, container };
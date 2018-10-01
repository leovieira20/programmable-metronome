import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Main from './components/common/MainComponent';
import Metronome from './domain/entities/Metronome';
import { container } from './inversify.config';
import AudioListener from './domain/listeners/AudioListener';

const globalComponents = {
  metronome: container.get<Metronome>(Metronome),
  audioListener: container.get<AudioListener>(AudioListener)
};

ReactDOM.render(
  <Main {...globalComponents} />,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();

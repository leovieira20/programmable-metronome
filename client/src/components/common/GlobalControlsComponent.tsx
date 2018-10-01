import * as React from 'react';
import { inject } from 'inversify';
import TYPES from '../../ioc/types';
import { Bus } from 'src/domain/entities/Bus';

export class GlobalControlsComponent extends React.Component {
  public gainAmount = 5;
  public tempo: number;
  public isPlaying: boolean;
  public resolution = 4;
  public gain = 100;
  public onToggleScheduler: any;

  @inject(TYPES.Bus) private bus: Bus;

  render() {
    return (
      <div className="col s12">
      <label>Gain:</label>
      <div className="input-field">
        <p className="range-field">
          <input type="range" min="0.0" max="100.0" step="{{gainAmount}}" value="gain" />
        </p>
      </div>
    </div>
    )
  }

  changeGainValue(amount: number) {
    if ((this.gain === 0 && amount < 1) || (this.gain === 100 && amount > 1)) {
      return;
    }

    this.gain += amount;
    this.bus.gainChannel.next(amount);
  }
}

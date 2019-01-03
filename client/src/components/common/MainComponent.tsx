import * as React from 'react'
import NavBar from './NavBarComponent';
import SimpleTabs from './TabsComponent';
import MetronomeComponent from 'src/components/metronome/MetronomeComponent';
import SchedulerComponent from '../scheduler/SchedulerComponent';

export default class Main extends React.Component {

  state = {
    gainAmount: 5,
    tempo: 120,
    resolution: 4
  }

  // @inject(TYPES.Bus) private bus: Bus

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SimpleTabs>
          <SchedulerComponent key={"scheduler"} />
          <MetronomeComponent key={"metronome"} />
        </SimpleTabs>
      </React.Fragment>
    )
  }

  componentWillMount(): void {
    // this.configureHotKeys();
    // this.toggleScheduler(false);
  }

  // toggleScheduler(isMetronomeActive: boolean) {
  //   this.metronomeComponent.toggleState(isMetronomeActive);
  //   this.schedulerComponent.toggleState(isMetronomeActive);
  // }

  // private configureHotKeys() {
  //   this.hotKeys.add(new Hotkey('space', (): boolean => {
  //     this.bus.playbackStateChannel.next();
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey(']', (): boolean => {
  //     this.metronomeComponent.increaseTempo();
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('[', (): boolean => {
  //     this.metronomeComponent.decreaseTempo();
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('up', (): boolean => {
  //     this.globalControlsComponent.changeGainValue(this.gainAmount);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('down', (): boolean => {
  //     this.globalControlsComponent.changeGainValue(-this.gainAmount);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('1', (): boolean => {
  //     this.metronomeComponent.changeResolution(1);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('2', (): boolean => {
  //     this.metronomeComponent.changeResolution(2);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('3', (): boolean => {
  //     this.metronomeComponent.changeResolution(3);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('4', (): boolean => {
  //     this.metronomeComponent.changeResolution(4);
  //     return false;
  //   }));

  //   this.hotKeys.add(new Hotkey('6', (): boolean => {
  //     this.metronomeComponent.changeResolution(5);
  //     return false;
  //   }));
  // }
}

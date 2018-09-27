import React, { Component } from 'react';
import NavBar from '../components/navbar.component';
import SimpleTabs from '../components/tabs.component';
import Metronome from '../components/metronome.component';
import SchedulerScreen from './scheduler/scheduler.screen';

class MainScreen extends Component {
  render() {
    return (
      <React.Fragment>
        <NavBar />
        <SimpleTabs tabs={['Scheduler', 'Metronome']}>
          <SchedulerScreen key={"scheduler"} />
          <Metronome key={"metronome"} />
        </SimpleTabs>
      </React.Fragment>
    )
  }
}

export default MainScreen;
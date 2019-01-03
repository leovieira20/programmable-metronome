import * as React from 'react';
import Metronome from 'src/domain/entities/Metronome';
import { Step } from 'src/domain/entities/Step';
import { Program } from 'src/domain/entities/Program';
import { Subscription } from 'rxjs';
import { ProgramRepository } from 'src/domain/services/ProgramRepository';
import { UserRepository } from 'src/domain/services/UserRepository';
import { Grid, Card, withStyles, CardContent, Button } from '@material-ui/core';
import { lazyInject } from 'src/inversify.config';

const styles = theme => ({
  card: {
    width: 500
  },
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
});

class SchedulerComponent extends React.Component<any, any> {
  private _isActive = false;
  private metronomePlaybackStatusSubscription: Subscription;
  alertMessage: string;
  isBusy: boolean;
  program: Program = new Program();

  @lazyInject(Metronome) private _metronome: Metronome;
  // private programRepository: ProgramRepository;
  // private userRepository: UserRepository;

  constructor(props) {
    super(props);
  }


  render() {
    const { classes } = this.props;

    return (
      <Grid container direction="row" justify="center">
        <Card className={classes.card}>
          <CardContent>
            <input
              type="number"
              //  (keyup.enter)="tempoModifier.blur()"
              //  (blur)="changeTempoModifier($event.target.value)"
              value={this.program.tempoModifier} />
            <label className="hide-on-small-only">Global Tempo Modifier (%)</label>
            <label className="hide-on-med-and-up">Tempo Modifier (%)</label>

            <Button
              onClick={this.loadProgram}
              className={classes.button}
              disabled={this.isBusy}
              value="contained"
              color="primary">
              Load Program
             </Button>
          </CardContent>
        </Card>
      </Grid>)


    //     <div class="row">
    //       <app-scheduler-item-form (onStepCreated)="addStep($event)"></app-scheduler-item-form>
    //     </div>

    //     <div *ngIf="program.steps.length > 0">
    //       <div class="section">
    //         <h5>Steps</h5>
    //       </div>

    //       <div class="row">
    //         <app-scheduler-item-list
    //           [isBusy]="isBusy"
    //           [program]="program"
    //           (onProgramSaved)="saveProgram()">
    //         </app-scheduler-item-list>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div materialize [materializeParams]="[alertMessage,3000]" [materializeActions]="toastActions"></div>
    // )    
  }

  ngOnInit(): void {
    // if (this.programRepository.getCurrentProgram()) {
    //   this.program = this.programRepository.getCurrentProgram();
    // }
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;

    // if (this._isActive) {
    //   this.metronome.setStepProvider(this);
    //   this.metronomePlaybackStatusSubscription = this.metronome.isPlayingStatus.subscribe(isPlaying => {
    //     if (!isPlaying) {
    //       this.resetProgram();
    //     }
    //   });
    // } else {
    //   this.metronomePlaybackStatusSubscription.unsubscribe();
    // }
  }

  addStep(s: Step) {
    this.program.addStep(s);
  }

  loadProgram() {
    // if (!this.userRepository.getCurrentUser()) {
    //   this.showAlert('You need to login to load a program');
    // } else {
    //   // this.router.navigate(['my-programs']);
    // }
  }

  saveProgram() {
    // if (!this.userRepository.getCurrentUser()) {
    //   this.showAlert('You need to login to save the program');
    // } else {
    //   this.save();
    // }
  }

  getNextStep(): Step {
    return this.program.getNextStep();
  }

  changeTempoModifier(tempo: number) {
    this.program.tempoModifier = Number(tempo);
  }

  private resetProgram() {
    this.program.reset();
  }

  private showAlert(message: string) {
    this.alertMessage = message;
    // this.toastActions.emit('toast');
  }

  private save() {
    this.isBusy = true;
    // this.programRepository.save(this.program, this.userRepository.getCurrentUser())
    //   .subscribe(null, error => this.isBusy = false, () => {
    //     this.isBusy = false;
    //   });
  }
}

export default withStyles(styles)(SchedulerComponent);
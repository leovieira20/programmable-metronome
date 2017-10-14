import {Component, OnInit} from '@angular/core';
import {Metronome} from '../../domain/entities/metronome';
import {IStepProvider} from '../../domain/entities/IStepProvider';
import {Step} from '../../domain/entities/Step';
import {Router} from '@angular/router';
import {IProgramRepository} from '../../domain/services/IProgramRepository';
import {Program} from '../../domain/entities/Program';
import {Setup} from "../../domain/entities/Setup";

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.template.html'
})
export class SchedulerComponent implements IStepProvider, OnInit {
  private _isActive = false;
  program: Program = new Program();

  constructor(private metronome: Metronome,
              private router: Router,
              private programRepository: IProgramRepository) {
  }

  ngOnInit(): void {
    if (this.programRepository.getCurrentProgram()) {
      this.program = this.programRepository.getCurrentProgram();
    }
  }

  toggleState(isMetronomeActive: boolean) {
    this._isActive = !isMetronomeActive;
    if (this._isActive) {
      this.metronome.setStepProvider(this);
    }
  }

  public addStep(s: Step) {
    this.program.steps.push(s);
  }

  public loadProgram() {
    this.router.navigate(['my-programs']);
  }

  public getNextStep(): Setup {
    return this.program.getCurrentSetup();
  }
}

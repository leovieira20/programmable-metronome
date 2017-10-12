import {Component, OnInit} from '@angular/core';
import {Program} from '../../../domain/entities/Program';
import {IProgramRepository} from '../../../domain/services/IProgramRepository';
import {IUserRepository} from '../../../domain/services/IUserRepository';

@Component({
  selector: 'app-my-programs',
  templateUrl: './my-programs.component.html'
})
export class MyProgramsComponent implements OnInit {
  programs: [Program];

  constructor(private programRepository: IProgramRepository, private userRepository: IUserRepository) {
  }

  ngOnInit() {
    this.programRepository.fetchMyPrograms(this.userRepository.getCurrentUser())
      .subscribe(x => this.programs = x);
  }

  removeProgram() {

  }
}

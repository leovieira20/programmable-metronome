import * as React from 'react';
import { inject } from 'inversify';
import { Program } from 'src/domain/entities/Program';
import { ProgramRepository } from 'src/domain/services/ProgramRepository';
import { UserRepository } from 'src/domain/services/UserRepository';
import TYPES from '../../../ioc/types';

export class MyProgramsComponent extends React.Component {
  programs: [Program];

  @inject(TYPES.ProgramRepository) private programRepository: ProgramRepository;
  @inject(TYPES.UserRepository) private userRepository: UserRepository;

  render() {
    // return (
    //   <div className= "col s12" >
    //   <ul className="collection" >
    //     <li className="collection-item" >
    //       <div>
    //       <span onClick={ (p) => this.loadProgram(p) }> Name: "" </span>
    //         < div className = "secondary-content" onClick={(ix) => this.removeProgram(ix)} >
    //           <i className="material-icons" > delete </i>
    //           < /div>
    //           < /div>
    //         < /li>
    //         < /ul>
    //     < /div>
    // )
    return <div></div>
  }

  componentWillMount() {
    this.programRepository.fetchMyPrograms(this.userRepository.getCurrentUser())
      .subscribe(x => this.programs = x);
  }

  loadProgram(p: Program) {
    this.programRepository.setCurrentProgram(p);
    //this.router.navigate(['']);
  }

  removeProgram(ix: number) {
    // this.programRepository.delete(this.programs[ix])
    //   .subscribe(x => {
    //     this.programs.splice(ix, 1);
    //   });
  }
}

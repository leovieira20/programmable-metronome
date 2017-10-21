import {Component, OnInit} from '@angular/core';
import {Program} from '../../domain/entities/Program';
import {IProgramRepository} from '../../domain/services/IProgramRepository';
import {IUserRepository} from '../../domain/services/IUserRepository';
import {Router} from '@angular/router';

@Component({
  selector: 'app-my-programs',
  template: `
    <div class="col s12">
      <ul class="collection">
        <li *ngFor="let p of programs; let ix = index" class="collection-item">
          <div>
            <span (click)="loadProgram(p)">Name: {{p.name}}</span>
            <div class="secondary-content" (click)="removeProgram(ix)">
              <i class="material-icons">delete</i>
            </div>
          </div>
        </li>
      </ul>
    </div>
  `
})
export class MyProgramsComponent implements OnInit {
  programs: [Program];

  constructor(private programRepository: IProgramRepository,
              private userRepository: IUserRepository,
              private router: Router) {
  }

  ngOnInit() {
    this.programRepository.fetchMyPrograms(this.userRepository.getCurrentUser())
      .subscribe(x => this.programs = x);
  }

  loadProgram(p: Program) {
    this.programRepository.setCurrentProgram(p);
    this.router.navigate(['']);
  }

  removeProgram(ix: number) {
    this.programRepository.delete(this.programs[ix])
      .subscribe(x => {
        this.programs.splice(ix, 1);
      });
  }
}

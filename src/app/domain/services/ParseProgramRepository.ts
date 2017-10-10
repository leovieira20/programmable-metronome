import {Injectable} from '@angular/core';
import {IProgramRepository} from './IProgramRepository';
import {Program} from '../entities/Program';
import * as Parse from 'parse';
import {IUserRepository} from './IUserRepository';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ParseProgramRepository implements IProgramRepository {
  constructor(private userRepository: IUserRepository) {
  }

  save(program: Program): Observable<boolean> {
    return Observable.create(observer => {
      const ParseProgram = Parse.Object.extend('Program');
      const p = new ParseProgram();

      p.save({
        name: program.name,
        steps: program.steps.map(x => {
          return {
            tempo: x.tempo,
            resolutionId: x.resolution.id,
            beats: x.beats
          };
        }),
        owner: this.userRepository.getCurrentUser()
      }, {
        success: x => {
          observer.next(true);
          observer.complete();
        },
        error: (x, error) => {
          observer.next(false);
        }
      });
    });
  }
}

import {Injectable} from '@angular/core';
import {IProgramRepository} from './IProgramRepository';
import {Program} from '../entities/Program';
import * as Parse from 'parse';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class ParseProgramRepository implements IProgramRepository {
  private ClassName = 'Program';

  constructor() {
  }

  save(program: Program, currentUser: any): Observable<boolean> {
    return Observable.create(observer => {
      const ParseProgram = Parse.Object.extend(this.ClassName);
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
        owner: currentUser
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

  fetchMyPrograms(currentUser: any): Observable<[Program]> {
    return Observable.create(observer => {
      const query = new Parse.Query(this.ClassName);
      query.equalTo('owner', currentUser);

      query.find({
        success: results => {
          observer.next(results.map(x => {
            return {
              name: x.get('name'),
              steps: x.get('steps')
            };
          }));
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }
}

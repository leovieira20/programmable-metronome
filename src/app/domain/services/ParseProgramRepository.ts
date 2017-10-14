import {Injectable} from '@angular/core';
import {IProgramRepository} from './IProgramRepository';
import {Program} from '../entities/Program';
import * as Parse from 'parse';
import {Observable} from 'rxjs/Observable';
import ResolutionOptions from '../entities/resolutionOptions';
import {Step} from "../entities/Step";

@Injectable()
export class ParseProgramRepository implements IProgramRepository {
  private currentProgram: Program;
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
            const steps = [];

            for (let s of x.get('steps')) {
              steps.push(this.parseToDomainStep(s));
            }

            const p = new Program();
            p.id = x.id;
            p.name = x.get('name');
            p.steps = steps;

            return p;
          }));
          observer.complete();
        },
        error: error => {
          observer.error(error);
        }
      });
    });
  }

  getCurrentProgram(): Program {
    return this.currentProgram;
  }

  setCurrentProgram(p: Program) {
    this.currentProgram = p;
  }

  delete(p: Program): Observable<any> {
    const query = new Parse.Query(this.ClassName);

    return Observable.fromPromise(query.get(p.id))
      .flatMap(x => Observable.fromPromise(x.destroy()));
  }

  private parseToDomainStep(s: any): Step {
    const step = new Step();
    step.tempo = s.tempo;
    step.beats = s.beats;
    step.resolution = ResolutionOptions.find(r => r.id === s.resolutionId);

    return step;
  }
}

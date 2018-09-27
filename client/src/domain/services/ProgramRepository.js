import {Injectable} from '@angular/core';
import {Program} from '../entities/program';
import * as Parse from 'parse';
import {Observable} from 'rxjs/Observable';
import ResolutionOptions from '../entities/resolutionOptions';
import {Step} from '../entities/step';

@Injectable()
export class ProgramRepository {
  private currentProgram: Program;
  private ClassName = 'Program';

  constructor() {
  }

  save(program: Program, currentUser: any): Observable<boolean> {
    return Observable.create(observer => {
      const ParseProgram = Parse.Object.extend(this.ClassName);
      const p = new ParseProgram();

      p.save({
        objectId: program.id,
        name: program.name,
        tempoModifier: program.tempoModifier,
        owner: currentUser,
        steps: program.steps.map(x => {
          return {
            tempo: x.tempo,
            resolutionId: x.resolution.id,
            beats: x.beats,
            tempoLock: x.tempoLock
          };
        })
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

            for (const s of x.get('steps')) {
              steps.push(this.parseToDomainStep(s));
            }

            const p = new Program();
            p.id = x.id;
            p.name = x.get('name');
            p.tempoModifier = x.get('tempoModifier');
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
    const step = new Step(s.tempo, s.beats, ResolutionOptions.find(r => r.id === s.resolutionId));
    step.tempoLock = s.tempoLock;

    return step;
  }
}

import {Program} from '../entities/Program';
import {Observable} from 'rxjs/Observable';

export abstract class IProgramRepository {
  abstract save(program: Program, currentUser: any): Observable<boolean>;

  abstract fetchMyPrograms(currentUser: any): Observable<[Program]>;
}

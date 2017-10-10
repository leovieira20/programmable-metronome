import {Program} from '../entities/Program';
import {Observable} from 'rxjs/Observable';

export abstract class IProgramRepository {
  abstract save(program: Program): Observable<boolean>;
}

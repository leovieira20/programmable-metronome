import {Observable} from 'rxjs/Observable';

export abstract class IProfileRepository {

  abstract save(profile: any): Observable<boolean>;
}

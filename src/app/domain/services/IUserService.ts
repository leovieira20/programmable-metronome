import {Observable} from 'rxjs/Observable';

export abstract class IUserService {
  user: Observable<any>;

  abstract login();

  abstract logout();
}

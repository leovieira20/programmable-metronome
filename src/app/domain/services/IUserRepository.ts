import {Subject} from 'rxjs/Subject';

export abstract class IUserRepository {
  user: Subject<any>;

  abstract setCurrentUser(user: any);
}

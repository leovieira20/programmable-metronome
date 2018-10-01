import * as Parse from 'parse';
import { Subject, BehaviorSubject } from 'rxjs';

export class UserRepository {
  user: Subject<any> = new BehaviorSubject(null);

  constructor() {
    this.user.next(Parse.User.current());
  }

  getCurrentUser(): any {
    return Parse.User.current();
  }

  setCurrentUser(user: any) {
    this.user.next(user);
  }
}

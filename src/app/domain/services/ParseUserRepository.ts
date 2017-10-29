import {IUserRepository} from './IUserRepository';
import {Injectable} from '@angular/core';
import * as Parse from 'parse';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class ParseUserRepository implements IUserRepository {
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

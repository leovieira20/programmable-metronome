import {IUserService} from './IUserService';
import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';

import * as firebase from 'firebase/app';

@Injectable()
export class FirebaseUserService implements IUserService {
  user: Observable<any>;

  constructor(private angularAuth: AngularFireAuth) {
    this.user = this.angularAuth.authState;
  }

  login() {
    this.angularAuth.auth.signInWithRedirect(new firebase.auth.FacebookAuthProvider());
  }

  logout() {
    this.angularAuth.auth.signOut();
  }
}

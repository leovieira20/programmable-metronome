import * as Parse from 'parse';
import User = Parse.User;
import {Injectable} from '@angular/core';
import {ProfileRepository} from './ProfileRepository';
import {UserRepository} from './UserRepository';

declare const FB: any;

@Injectable()
export class LoginService {
  private _fields = 'email,first_name,last_name,name,gender,cover,location,relationship_status,hometown';

  constructor(private userRepository: UserRepository,
              private profileRepository: ProfileRepository) {
  }

  login() {
    Parse.FacebookUtils.logIn('email', {
        success: (user: User) => {
          this.userRepository.setCurrentUser(user);

          FB.api(`/ ${user.attributes.authData.facebook.id}`, 'get', {fields: this._fields},
            response => {
              if (!(response && !response.error)) {
                return;
              }

              this.profileRepository.save(response)
                .subscribe(null, err => console.log(err));
            });
        }
      }
    );
  }

  logout() {
    Parse.User.logOut()
      .then(() => {
        this.userRepository.setCurrentUser(null);
      });
  }
}

import {ILoginService} from './ILoginService';
import * as Parse from 'parse';
import User = Parse.User;
import {Injectable} from '@angular/core';
import {IUserRepository} from './IUserRepository';
import {IProfileRepository} from './IProfileRepository';

declare const FB: any;

@Injectable()
export class ParseLoginService implements ILoginService {
  private _fields = 'email,first_name,last_name,name,gender,cover,location,relationship_status,locale,hometown';

  constructor(private userRepository: IUserRepository,
              private profileRepository: IProfileRepository) {
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

import {ILoginService} from './ILoginService';
import * as Parse from 'parse';
import User = Parse.User;
import {Injectable} from '@angular/core';
import {IUserRepository} from './IUserRepository';

declare var FB: any;

@Injectable()
export class ParseLoginService implements ILoginService {
  constructor(private userRepository: IUserRepository) {

  }

  login() {
    Parse.FacebookUtils.logIn('email', {
        success: (user: User) => {
          FB.api(user.attributes.authData.facebook.id,
            response => {
              if (response && !response.error) {
                this.userRepository.setCurrentUser(user);
              }
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

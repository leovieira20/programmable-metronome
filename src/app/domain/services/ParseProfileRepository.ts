import {IProfileRepository} from './IProfileRepository';
import {Observable} from 'rxjs/Observable';
import * as Parse from 'parse';
import {Injectable} from '@angular/core';

@Injectable()
export class ParseProfileRepository implements IProfileRepository {
  constructor() {
  }

  save(profile: any): Observable<boolean> {
    return Observable.fromPromise(Parse.Cloud.run('profile.upsert', {
      email: profile.email,
      firstName: profile.first_name,
      lastName: profile.last_name,
      name: profile.name,
      gender: profile.gender,
      location: profile.location,
      relationshipStatus: profile.relationship_status,
      coverPicture: profile.cover.source
    }));
  }
}

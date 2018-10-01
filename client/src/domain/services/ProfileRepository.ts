import { Observable } from 'rxjs';
// import * as Parse from 'parse';
import { injectable } from 'inversify';

@injectable()
export class ProfileRepository {
  constructor() {
  }

  save(profile: any): Observable<boolean> | null {
    // return Observable.fromPromise(Parse.Cloud.run('profile.upsert', {
    //   email: profile.email,
    //   firstName: profile.first_name,
    //   lastName: profile.last_name,
    //   name: profile.name,
    //   gender: profile.gender,
    //   location: profile.location,
    //   relationshipStatus: profile.relationship_status,
    //   coverPicture: profile.cover.source
    // }));
    return null;
  }
}

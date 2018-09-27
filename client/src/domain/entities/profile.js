export default class Profile {
  email;
  name;
  firstName;
  lastName;
  gender;
  relationshipStatus;
  coverPicture;
  location;


  constructor(params) {
    if (params) {
      for (let p of params) {
        [p] = params[p];
      }
    }
  }
}

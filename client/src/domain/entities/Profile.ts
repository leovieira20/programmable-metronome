export class Profile {
  public email;
  public name;
  public firstName;
  public lastName;
  public gender;
  public relationshipStatus;
  public coverPicture;
  public location;


  constructor(params?: any) {
    if (params) {
      for (let p of params) {
        [p] = params[p];
      }
    }
  }
}

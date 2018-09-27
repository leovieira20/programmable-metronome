const updateProfile = (request, response) => {
  console.log(request.user);
  const params = request.params;
  const query = new Parse.Query('Profile');

  query.equalTo('email', request.params.email)
    .find()
    .then(profiles => {
      const ParseProfile = Parse.Object.extend('Profile');
      const p = new ParseProfile();

      if (profiles.length > 0) {
        p.set('objectId', profiles[0].id);
      } else {
        p.set('email', params.email);
        p.set('user', request.user);
      }

      p.save({
        firstName: params.firstName,
        lastName: params.lastName,
        name: params.name,
        gender: params.gender,
        relationshipStatus: params.relationshipStatus,
        coverPicture: params.coverPicture,
        location: params.location
      }).then(result => {
        response.success(result);
      }, err => {
        response.error(err);
      });
    }, error => {
      console.log(error);
    });
};

Parse.Cloud.define('profile.upsert', updateProfile);

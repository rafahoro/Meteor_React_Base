import { check, Match } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


function createNewUser(user) {
  check(user, {email: String, role: String, name: String, lastName: String});
  const usr = {
    email: user.email
  };
  const id = Accounts.createUser(usr /* , [callback]*/);
  Meteor.users.update({_id: id}, {
    $set: {
      profile: {
        name: {first: user.name, last: user.lastName}
      }
    }
  });
  /* uncomment if you want to send enrollment email
   if (Meteor.isServer) {
   Accounts.sendEnrollmentEmail(id);
   }
   */
}

function updateUser(user) {
  check(user, Match.Any);
  Meteor.users.update(user.id, {
    $set: {
      'emails.0.address': user.email,
      'profile.name.first': user.firstName,
      'profile.name.last': user.lastName
    }
  });
}

Meteor.methods({
  createNewUser,
  updateUser
});

import { check } from 'meteor/check';
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

Meteor.methods({
  createNewUser
});

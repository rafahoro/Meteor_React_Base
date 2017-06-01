import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/accounts-base';
import ROLES from '../../api/accounts/roles.js';

if (!Meteor.isProduction) {
  const users = [
    {
      email: 'admin@example.com',
      password: 'password',
      profile: {
        name: {first: 'Jhon', last: 'Dhoe'}
      },
      roles: [ROLES.ADMIN]
    }
  ];

  users.forEach(({ email, password, profile, roles }) =>{
    const userExists = Meteor.users.findOne({'emails.address': email});
    if (!userExists) {
      const userId = Accounts.createUser({email, password, profile});
      Roles.addUsersToRoles(userId, roles);
    }
  });
}

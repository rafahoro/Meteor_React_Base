import { Meteor } from 'meteor/meteor';

function publishUserData() {
  if (!this.userId) {
    return null;
  }
  return Meteor.users.find(this.userId, {});
}

Meteor.publish('userData', publishUserData);

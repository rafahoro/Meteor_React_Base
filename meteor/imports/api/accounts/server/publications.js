import { Meteor } from 'meteor/meteor';

function publishUserData() {
  if (!this.userId) {
    return null;
  }
  return Meteor.users.find(this.userId, {});
}

function UsersList() {
  // TODO: We should probably check the requester's userId to see if we want to share every user data.
  return Meteor.users.find({});
}

Meteor.publish('userData', publishUserData);
Meteor.publish('Users.list', UsersList);


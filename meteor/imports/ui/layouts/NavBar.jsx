import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout() {
    Meteor.logout(() => browserHistory.push('/login'));
  }

  render() {
    return (
      <div>
        <div className="salutation">
          Hi
          {Meteor.user() && Meteor.user().profile &&
          ` ${Meteor.user().profile.name.first}`
          }
          {!Meteor.userId() && (
            <span>Anonymous</span>
          )}
        </div>
        <div className="navigationBar">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
            {!Meteor.userId() && (
              <li>
                <Link to="/login">Log In</Link>
              </li>
            )}
            {!Meteor.userId() && (
              <li>
                <Link to="/signup">Sign up</Link>
              </li>
            )}
            {Meteor.userId() && (
              <li>
                <Link onClick={ this.handleLogout } to="/">Logout</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool
};


export default createContainer((/* {params}*/) =>{
  const subscription = Meteor.subscribe('userData');
  const loading = !subscription.ready();
  return {subscriptions: [subscription], loading};
}, NavBar);


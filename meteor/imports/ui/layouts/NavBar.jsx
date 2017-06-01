import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Link, browserHistory } from 'react-router';
import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleLogout = this.handleLogout.bind(this);
    this.renderSalutation = this.renderSalutation.bind(this);
  }

  handleLogout() {
    Meteor.logout(() =>{
      browserHistory.push('/');
    });
  }

  renderSalutation() {
    if (!Meteor.userId()) {
      return <div>Hi Anonymous</div>;
    }
    if (Meteor.user() && Meteor.user().profile) {
      return (
        <div>
          Hi {Meteor.user().profile.name.first}. Your roles are: {Roles.getRolesForUser(Meteor.user())} -
        </div>
      );
    }
    return (<div></div>); // the user has finished loggin, but we did not get yet it's profile. Waiting for reactivity to work :)
  }

  render() {
    return (
      <div>
        <div className="salutation">
          {this.renderSalutation()}
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
            {/* ********************
            Below links are there to show Roles authentication usage.
            Of course makes more sense to hide unavailable ones by role. IE:
             { Meteor.user() && Roles.userIsInRole(Meteor.user(), ROLES.ROLE1) &&
             <li>
               <Link onClick={ this.handleLogout } to="/for_role1">for_role1</Link>
             </li>
             }
            I'm leaving them open, so you can easily check that Roles authentication works.
             *************/ }

            <li>
              <Link to="/for_any_one">for_any_one</Link>
            </li>
            <li>
              <Link to="/for_logged_ones">for_logged_ones</Link>
            </li>
            <li>
              <Link to="/for_any_role">for_any_role</Link>
            </li>
            <li>
              <Link to="/for_role_1_or_2">for_role_1_or_2</Link>
            </li>
            <li>
              <Link to="/for_role1">for_role1</Link>
            </li>
            <li>
              <Link to="/for_role2">for_role2</Link>
            </li>
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
  Meteor.user(); // so we render again in logout or if any change on our User (ie: new roles)
  const loading = !subscription.ready();
  return {subscriptions: [subscription], loading};
}, NavBar);


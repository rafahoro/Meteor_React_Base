import React, { Component } from 'react';
import { createContainer } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import { Roles } from 'meteor/alanning:roles';

import Loading from '../../components/Loading.jsx';

class Users extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUnmount() {
    this.props.subscriptions.forEach((s) =>{
      s.stop();
    });
  }

  renderBody() {
    const users = this.props.users;
    return (
      <tbody>
      {
        users.map((user, idx) =>
          <tr key={idx}>
            <td>{idx + 1} </td>
            <td>
              <Link to={{ pathname: `/users/${user._id}` }}>{user.profile.name.first}</Link>
            </td>
            <td>{user.emails[0].address}</td>
            <td>{Roles.getRolesForUser(user._id)}</td>
          </tr>
        )
      }
      </tbody>
    );
  }

  renderLoading() {
    if (!this.props.loading || 0 < _.size(this.props.users)) { // size... to avoid flickering
      return false;
    }
    return (
      <Loading />
    );
  }

  render() {
    return this.renderLoading() || (
      <div>
        <h2 > Users</h2>
        <div>
          <table>
            <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>email</th>
              <th>Roles</th>
            </tr>
            </thead>
            {this.renderBody()}
          </table>
        </div>
      </div>
    );
  }
}

Users.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  users: PropTypes.array
};

export default createContainer(() =>{
  const subscription = Meteor.subscribe('Users.list');
  const loading = !subscription.ready();
  const users = loading ? undefined : Meteor.users.find().fetch();
  return {subscriptions: [subscription], loading, users};
}, Users);

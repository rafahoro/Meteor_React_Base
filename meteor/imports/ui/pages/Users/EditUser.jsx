import React, { Component } from 'react';
import { browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import { createContainer } from 'meteor/react-meteor-data';
import { Roles } from 'meteor/alanning:roles';

import ROLES from '../../../api/accounts/roles.js';


class EditUser extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      firstName: '',
      lastName: '',
      roles: [],
      id: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.user) {
      return;
    }
    const user = nextProps.user;
    this.setState({
      email: user.emails[0].address,
      firstName: user.profile.name.first,
      lastName: user.profile.name.last,
      roles: Roles.getRolesForUser(user._id),
      id: user._id
    });
  }

  handleChange(event) {
    const target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    if (target.type === 'select-multiple') {
      value = [];
      const options = event.target.options;
      for (let i = 0, l = options.length; i < l; i++) {
        if (options[i].selected) {
          value.push(options[i].value);
        }
      }
      value = _.compact(value);
    }
    const name = target.id;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const user = {
      id: this.state.id,
      email: this.state.email,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      roles: this.state.roles
    };
    Meteor.call('updateUser', user, (error) =>{
      if (error) {
        alert(error.reason);
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <div>
        <h4>Edit User</h4>
        <form onSubmit={ this.handleSubmit }>
          <fieldset>
            <label htmlFor="firstName">Name</label>
            <input id="firstName" type="text" placeholder="Jhon"
                   onChange={this.handleChange} value={this.state.firstName}/>
          </fieldset>
          <fieldset>
            <label htmlFor="lastName">Lastname</label>
            <input id="lastName" type="text" placeholder="Doe"
                   onChange={this.handleChange} value={this.state.lastName}/>
          </fieldset>

          <fieldset>
            <label htmlFor="email">EMAIL</label>
            <input id="email" type="email" placeholder="user@example.com"
                   onChange={this.handleChange} value={this.state.email}/>
          </fieldset>

          <fieldset >
            <label htmlFor="roles">Roles</label>
            <select onChange={this.handleChange} id="roles" multiple value={this.state.roles}>
              <option value="">NO ROLES</option>
              {
                _.map(ROLES, (rol, i) =>
                  <option key={i} value={rol} >{rol}</option>
                )
              }
            </select>
          </fieldset>


          <input type="submit" value="submit"/>
        </form>
      </div>
    );
  }
}

EditUser.propTypes = {
  subscriptions: PropTypes.array,
  loading: PropTypes.bool,
  user: PropTypes.object
};

export default createContainer((props) =>{
  const userId = props.params.userId;
  const subscription = Meteor.subscribe('Users.get', userId);
  const loading = !subscription.ready();
  const user = loading ? undefined : Meteor.users.findOne({_id: userId});
  return {subscriptions: [subscription], loading, user};
}, EditUser);


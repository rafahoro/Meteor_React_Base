import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { browserHistory, Link } from 'react-router';

class Login extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.id;
    this.setState({
      [name]: value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    Meteor.loginWithPassword(this.state.email, this.state.password, (error) =>{
      if (error) {
        alert(error.reason);
        return;
      }
      const { location } = this.props;
      if (location.state && location.state.nextPathname) {
        browserHistory.push(location.state.nextPathname);
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <div className="Login">
        <h4 className="page-header">Login page</h4>
        <form className="login" onSubmit={ this.handleSubmit }>
          <fieldset>
            <label htmlFor="email">EMAIL</label>
            <input id="email" type="email" placeholder="user@example.com"
                   onChange={this.handleChange} value={this.state.email}/>
          </fieldset>
          <fieldset>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password"
                   onChange={this.handleChange} value={this.state.password}/>

          </fieldset>
          <input type="submit" value="submit"/>
        </form>
        <p>Need an account? <Link to="/signup">Sign up</Link>.</p>
      </div>
    );
  }
}

Login.propTypes = {
  location: PropTypes.object
};


export default Login;

import React, { Component } from 'react';
import { browserHistory, Link } from 'react-router';

class Signup extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      email: '',
      password: '',
      firstName: '',
      lastName: ''
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
    const user = {
      email: this.state.email,
      password: this.state.password,
      profile: {
        name: {
          first: this.state.firstName,
          last: this.state.lastName
        }
      }
    };

    Accounts.createUser(user, (error) => {
      if (error) {
        alert(error.reason);
      } else {
        browserHistory.push('/');
      }
    });
  }

  render() {
    return (
      <div className="Signup">
        <h4 className="page-header">Sign Up</h4>
        <form className="login" onSubmit={ this.handleSubmit }>
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
          <fieldset>
            <label htmlFor="password">Password</label>
            <input id="password" type="password" placeholder="Password"
                   onChange={this.handleChange} value={this.state.password}/>

          </fieldset>
          <input type="submit" value="submit"/>
        </form>
        <p>Already have an account? <Link to="/login">Log In</Link>.</p>
      </div>
    );
  }
}


Signup.propTypes = {};


export default Signup;

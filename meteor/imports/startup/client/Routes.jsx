import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from '../../ui/layouts/App.jsx';

import NotFound from '../../ui/pages/NotFound.jsx';
import Index from '../../ui/pages/Index.jsx';

import Login from '../../ui/pages/Login.jsx';
import Signup from '../../ui/pages/Signup.jsx';

import Users from '../../ui/pages/Users/Users.jsx';
import EditUser from '../../ui/pages/Users/EditUser.jsx';


class Routes extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={ browserHistory }>
        <Route path="/" component={ App }>
          <IndexRoute name="index" component={ Index }/>
          <Route name="login" path="/login" component={ Login }/>
          <Route name="users" path="/users" component={ Users }/>
          <Route name="editUser" path="/users/:userId" component={ EditUser }/>
          <Route name="signup" path="/signup" component={ Signup }/>
          <Route path="*" component={ NotFound }/>
        </Route>
      </Router>
    );
  }
}

Routes.propTypes = {};


Meteor.startup(() =>{
  ReactDOM.render(
    <Routes/>,
    document.getElementById('react-root')
  );
});

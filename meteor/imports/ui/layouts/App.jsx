import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NavBar from './NavBar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <NavBar />
        <div className="appContent">
          {this.props.children}
        </div>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};


export default App;

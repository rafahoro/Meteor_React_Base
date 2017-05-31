import React, { Component } from 'react';

class NotFound extends Component {
  render() {
    return (
      <div>
        <p><strong>Error [404]</strong>: Requested page ({ window.location.pathname }) does not exist.</p>
      </div>
    );
  }
}

export default NotFound;

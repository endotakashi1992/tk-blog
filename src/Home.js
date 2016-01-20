import React, { Component } from 'react';
var Link = require('react-router').Link

export default class Home extends Component {
  render() {
    return (
      <div>
        <h1>&lt;Home /&gt;</h1>
        <Link to={`/posts`}>/posts</Link>
        {this.props.children}
      </div>
    );
  }
}

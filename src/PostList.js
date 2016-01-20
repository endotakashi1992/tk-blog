import React, { Component } from 'react';
import Post from './Post';
var Link = require('react-router').Link

export default class PostList extends Component {
  render() {
    return (
      <div>
        <h1>&lt;PostList /&gt;</h1>
        <Link to={`/posts/123`}>記事１</Link>
      </div>
    );
  }
}

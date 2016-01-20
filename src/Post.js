import React, { Component } from 'react';

export default class Post extends Component {
  render() {
    console.log(this.props.params)
    return (
      <div>
        <h1>&lt;Post /&gt;</h1>
        <p>ID:{this.props.params.postId}</p>
      </div>
    );
  }
}

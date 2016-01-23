import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
var Link = require('react-router').Link

export default class PostList extends Component {
  constructor(props) {
    super(props);
    this.state = {posts:[]};
  }
  componentWillMount() {
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/`);
    this.bindAsArray(ref, "posts");
  }

  render() {
    let postList = this.state.posts.map((post)=>{
      return <h5><Link to={`/posts/${post[".key"]}`}>{post.title}</Link></h5>
    })
      return (
        <div>
          {postList}
        </div>
      );

  }
}
reactMixin(PostList.prototype,ReactFireMixin)

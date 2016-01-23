import React, { Component } from 'react';
import Post from './Post';
var Link = require('react-router').Link

export default class PostList extends Component {
  componentWillMount() {
    this.setState({idLoaded: false})
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/`);
    ref.on('value',(snap)=>{
      let _state = this.state || {}
      _state.posts = snap.val()
      this.setState(_state)
      this.setState(_state)
      console.log(this.state)
    })
  }

  render() {
    if(this.state.posts){
      return (
        <div>
          hello
        </div>
      );
    }

  }
}

import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
var Link = require('react-router').Link


import {RaisedButton,AppBar,Card,CardMedia,CardHeader} from 'material-ui';


let postListStyle = {
  width:'400px',
  margin:'20px'
}

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
      return (
        <Card style={postListStyle}>
            <CardMedia>
              <img src={post.image}/>
            </CardMedia>
            <Link to={`/posts/${post[".key"]}`}>
              <CardHeader
                title={post.title}
                subtitle={post.headline}
              />
            </Link>

          </Card>
      )
    })
      return (
        <div style={{display:'flex'}}>
          {postList}
        </div>
      );

  }
}


reactMixin(PostList.prototype,ReactFireMixin)

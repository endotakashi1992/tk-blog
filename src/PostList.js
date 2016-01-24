import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
var Link = require('react-router').Link

import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Card,CardMedia,CardHeader} from 'material-ui';
injectTapEventPlugin();

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
          <Card style={{width:"200px"}}>

            <CardMedia>
              <img src="http://lorempixel.com/600/337/nature/"/>
            </CardMedia>
            <CardHeader
              title="Demo Url Based Avatar"
              subtitle="Subtitle"
              avatar="http://lorempixel.com/100/100/nature/"/>
          </Card>
          {postList}
        </div>
      );

  }
}
reactMixin(PostList.prototype,ReactFireMixin)

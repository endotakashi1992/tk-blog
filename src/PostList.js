import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
var Link = require('react-router').Link

import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Card,CardMedia,CardTitle,CardActions} from 'material-ui';
injectTapEventPlugin();

let postListStyle = {

}

let styles = {
  container:{
    display:'flex',
    'flex-wrap':'wrap',
    'justify-content': 'center',
    'align-items': 'center'
  },
  postCard:{
    overflow:'visible',
    width:'400px',
    margin:'20px'
  }
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
        <Card style={styles.postCard}>
            <CardMedia>
              <img src={post.image}/>
            </CardMedia>
            <Link to={`/posts/${post[".key"]}`}>
              <CardTitle
                title={post.title}
                subtitle={post.headline}
                avatar="http://lorempixel.com/100/100/nature/"
              />
            </Link>

          </Card>
      )
    })
      return (
        <div style={styles.container}>
          {postList}
        </div>
      );

  }
}


reactMixin(PostList.prototype,ReactFireMixin)

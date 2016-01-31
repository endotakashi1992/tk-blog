import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import { Link } from 'react-router'
let ReactRouter = require('react-router')
console.log(ReactRouter)

import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Card,CardMedia,CardTitle,CardActions,FlatButton} from 'material-ui';
injectTapEventPlugin();


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
  handleReadMore(e) {
    console.log(e)
    // window.location.assign(`/#/posts/`);
  }

  render() {
    let postList = this.state.posts.map((post)=>{
      return (
        <Card style={styles.postCard}>
            <CardMedia>
              <img src={post.image}/>
            </CardMedia>
              <CardTitle
                title={post.title}
                subtitle={post.headline}
                avatar="http://lorempixel.com/100/100/nature/"
              />
            <CardActions>
              <Link to={`/posts/${post[".key"]}`}>
              <FlatButton label="READ MORE" onClick={this.handleReadMore.bind(this)}/>
              </Link>
            </CardActions>
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

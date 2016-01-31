import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import { Link } from 'react-router'
let ReactRouter = require('react-router')
console.log(ReactRouter)

import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Card,CardMedia,CardTitle,CardActions,FlatButton,Avatar} from 'material-ui';
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
  contextTypes() {
    router: React.PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);
    console.log(this.props.history)
    // this.props.history.transitionTo('posts/1/edit')

    this.state = {posts:[]};
  }
  componentWillMount() {
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/`);
    this.bindAsArray(ref, "posts");
  }
  handleReadMore(e) {
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
              />
            <CardActions>
              <Link to={`/posts/${post[".key"]}`}>
              <FlatButton label="MORE" onClick={this.handleReadMore.bind(this)}/>
              </Link>
              <Link to={`/posts/${post[".key"]}/edit`}>
              <FlatButton label="EDIT" onClick={this.handleReadMore.bind(this)}/>
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

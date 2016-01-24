import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import {RaisedButton,AppBar,Card,CardMedia,CardHeader} from 'material-ui';

let postStyles = {
  card:{
    margin:'20px',
    padding:'30px'
  },
  text:{
    float: 'left'
  }
}

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {post:{}};
  }
  componentWillMount() {
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/${this.props.params.postId}`);
    this.bindAsObject(ref, "post");
  }
  render() {
    return (
      <div style={{display:'flex'}}>
        <Card style={postStyles.card}>
        <h1>{this.state.post.title}</h1>
        <p><i>{this.state.post.headline}</i></p>
        <div >
          <img style={{float:'left',margin:'30px',width:'50%'}} src={this.state.post.image}></img>
          <p>{this.state.post.body}</p>
        </div>
        </Card>
      </div>
    );
  }
}
reactMixin(Post.prototype,ReactFireMixin)

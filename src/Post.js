import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';


export default class Post extends Component {
  componentWillMount() {
    // console.log(this.state)
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/${this.props.params.postId}`);
    this.bindAsArray(ref, "post");
    ref.on('value',(snap)=>{
      let _state = this.state
      _state.post = snap.val()
      this.setState(_state)
    })
  }
  componentDidMount() {
    console.log()
  }
  render() {
    return (
      <div>
        <h1>{this.state.post.title}</h1>
        <p><i>{this.state.post.headline}</i></p>
        <img src={this.state.post.image}></img>
        <p>{this.state.post.body}</p>
      </div>
    );
  }
}
reactMixin(Post.prototype,ReactFireMixin)

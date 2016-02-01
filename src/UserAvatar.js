import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import LoginButton from './LoginButton';
import reactMixin from 'react-mixin';
import {RaisedButton,AppBar,Card,CardMedia,CardHeader,CardTitle,Avatar} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);



export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {image:"https://cdn2.iconfinder.com/data/icons/windows-8-metro-style/512/guest.png"};

  }
  componentWillMount() {
    ref.onAuth((data)=>{
      if(data){
        this.setState({image:data.twitter.profileImageURL})
      }
    })
  }
  render() {
    return (
      <Avatar src={this.state.image} />
    )
  }
}
reactMixin(Post.prototype,ReactFireMixin)

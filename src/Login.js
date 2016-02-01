import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import LoginButton from './LoginButton';
import reactMixin from 'react-mixin';
import {RaisedButton,AppBar,Card,CardMedia,CardHeader,CardTitle,Avatar} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

let styleContainer = {
  card:{
    margin:'20px',
    padding:'30px',
    width:'30%'
  },
  container:{
    display:'flex',
    'alignItems': 'center',
    justifyContent: 'center'
  },
  text:{
    float: 'left'
  },
  avatar:{
    margin:0,
    height:'100px',
    width:'100px'
  }
}

export default class Post extends Component {
  constructor(props) {
    super(props);
    this.state = {post:{},loading:true};
    ref.onAuth((data)=>{
      if(data){
        window.location.assign(`/`);
      }
    })
  }
  render() {
    return (
      <div style={styleContainer.container}>
      <Card style={styleContainer.card}>
      <CardTitle title="Please Login" />
        <LoginButton />
      </Card>
      </div>
    )
  }
}
reactMixin(Post.prototype,ReactFireMixin)

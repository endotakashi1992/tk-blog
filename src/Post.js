import React, { Component } from 'react';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import TKForm from './Form';
import reactMixin from 'react-mixin';
import {RaisedButton,AppBar,Card,CardMedia,CardHeader,Avatar} from 'material-ui';

let postStyles = {
  card:{
    margin:'20px',
    padding:'30px'
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
  }
  componentWillMount() {
    console.log(this.props)
    let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/${this.props.params.postId}`);
    ref.on('value',()=>{
      this.setState({loading:false})
    })
    this.bindAsObject(ref, "post");
  }
  render() {
    if(this.state.loading){
      return <p>Now loading</p>
    }else{
      return (
        <div style={{display:'flex'}}>
          <Card style={postStyles.card}>
          <Avatar style={postStyles.avatar} src={this.state.post.autor.image} />
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
}
reactMixin(Post.prototype,ReactFireMixin)

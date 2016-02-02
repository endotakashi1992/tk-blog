import React, { Component } from 'react';
var LinkedStateMixin = require('react-addons-linked-state-mixin')
import Firebase from 'firebase'
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire'
let Router = require('react-router')
import {TextField,RaisedButton,Card,CardText,CardActions,FlatButton,Snackbar} from 'material-ui';
import filepicker from 'filepicker-js'
filepicker.setKey('AmtbglaVJTduac0cMyfDzz')


let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

let styleContainer = {
  image:{
    width:'300px'
  }
}

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
        edit:false,
        imageUploaded:false,
        image:"http://www.oradoko.jp/shop/images/noimage.jpg"
      };

  }
  componentDidMount() {
    if(this.props.params.postId){
      this.setState({edit:true})
      ref.child(`posts/${this.props.params.postId}`).on('value',(snap)=>{
        let _state = Object.assign(this.state,snap.val())
        _state.edit = true
        this.setState(_state)
      })
    }
  }
  handleClickInput() {
    self = this
    filepicker.pick(
  function(Blob){
    self.setState({image:Blob.url})
    self.setState({imageUploaded:true})
  }
);
  }
  handleCreate() {
    if(this.state.imageUploaded && this.state.title && this.state.headline && this.state.body){
    }else{
      this.setState({open:true})
      return;
    }

    if(this.state.edit){
      let post = ref.child(`posts/${this.props.params.postId}`)
      post.set(this.state,()=>{
        this.props.history.replace(`/posts/${this.props.params.postId}`);
      })
    }else{
      let new_post = ref.child('posts').push()
      let postId = new_post.key()
      this.state.autor = {
        uid:ref.getAuth().uid,
        name:ref.getAuth().twitter.username,
        image:ref.getAuth().twitter.profileImageURL
      }
      new_post.set(this.state,(e,data)=>{
        this.props.history.replace(`/posts/${postId}`);
      })
    }
  }
  handleDelete() {
    ref.child(`posts/${this.props.params.postId}`).remove()
    setTimeout(()=>{
      this.props.history.replace(`/`)
    },500)
  }
  render() {
    return (
      <div>
        <Card>
          <CardText>
            <TextField hintText="Title" valueLink={this.linkState('title')}/><br />
            <TextField hintText="headline" valueLink={this.linkState('headline')}/><br />
            <TextField multiLine="true" hintText="body" valueLink={this.linkState('body')}/><br />
            <RaisedButton label="Image" secondary={true} onClick={this.handleClickInput.bind(this)}/>
            <br />
            <img src={this.state.image} style={styleContainer.image}/>
          </CardText>
          <CardActions>
            <FlatButton label="Save" onClick={this.handleCreate.bind(this)}/>
            <FlatButton label="Delete" onClick={this.handleDelete.bind(this)}/>
          </CardActions>
          <Snackbar
  open={this.state.open}
  message="Please fill all fields"
  autoHideDuration={4000}
  onRequestClose={this.handleRequestClose}
/>
        </Card>

      </div>

    )

  }
}
reactMixin(Form.prototype,ReactFireMixin)
reactMixin(Form.prototype,LinkedStateMixin)

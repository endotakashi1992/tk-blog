import React, { Component } from 'react';
var LinkedStateMixin = require('react-addons-linked-state-mixin')
import Firebase from 'firebase'
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire'
let Router = require('react-router')
import {TextField,RaisedButton,Card,CardText,CardActions,FlatButton} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

export default class Form extends Component {
  constructor(props) {
      super(props);
      this.state = {
        title:"",
        postId:this.props.params.postId
      };
      if(this.props.params.postId){
        ref.child(`posts/${this.props.params.postId}`).on('value',(snap)=>{
          let _state = Object.assign(this.state,snap.val())
          this.setState(_state)
        })
      }


  }
  handleCreate() {
    if(this.state.postId){
      let post = ref.child(`posts/${this.state.postId}`)
      post.set(this.state,()=>{
        window.location.assign(`/#/posts/${this.state.postId}`);
      })
    }else{
      let new_post = ref.child('posts').push()
      let postId = new_post.key()
      new_post.set(this.state,(e,data)=>{
        window.location.assign(`/#/posts/${postId}`);
      })
    }

  }
  handleDelete() {
    ref.child(`posts/${this.state.postId}`).remove()
    window.location.assign(`/#/posts/`);
  }
  render() {
    return (
      <div>
        <Card>
          <CardText>
            <TextField hintText="Title" valueLink={this.linkState('title')}/><br />
            <TextField hintText="headline" valueLink={this.linkState('headline')}/><br />
            <TextField hintText="body" valueLink={this.linkState('body')}/><br />
          </CardText>
          <CardActions>
            <FlatButton label="Save" onClick={this.handleCreate.bind(this)}/>
            <FlatButton label="Delete" onClick={this.handleDelete.bind(this)}/>
          </CardActions>
        </Card>

      </div>

    )

  }
}
reactMixin(Form.prototype,ReactFireMixin)
reactMixin(Form.prototype,LinkedStateMixin)
// reactMixin(Form.prototype,Navigation)

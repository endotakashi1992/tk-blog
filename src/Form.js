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
      console.log(this.props.params)
      this.state = {
        title:""
      };
  }
  handleCreate() {
      let new_post = ref.child('posts').push()
      new_post.set(this.state,(e,data)=>{
        window.location.assign(`/#/posts/${new_post.key()}`);
      })
  }
  handleDelete() {
    ref.child(`posts/${this.state[".key"]}`).remove()
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
            <FlatButton label="Create" onClick={this.handleCreate.bind(this)}/>
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

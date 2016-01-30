import React, { Component } from 'react';
import Firebase from 'firebase'
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire'

import {TextField} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

export default class Form extends Component {
  componentWillMount() {
  }
  render() {
    return (
      <div>
      <TextField hintText="Title"/>
      <TextField hintText="headline"/>
      <TextField hintText="body"/>
      </div>

    )

  }
}
reactMixin(Form.prototype,ReactFireMixin)

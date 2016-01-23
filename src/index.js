import React, { Component } from 'react';
import { render } from 'react-dom'

import Home from './Home';
import PostList from './PostList';
import Post from './Post';
import { createHistory, useBasename } from 'history'
import { Router, Route, Link, browserHistory,IndexRoute } from 'react-router'

import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
class Index extends Component {
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <Route path="/posts/:postId" component={Post}/>
      <Route path="/posts" component={PostList}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('root'))

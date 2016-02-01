import React, { Component } from 'react';
import { render } from 'react-dom'

import Home from './Home';
import PostList from './PostList';
import Post from './Post';
import TKForm from './Form';
import LoginButton from './LoginButton';
import { createHistory, useBasename } from 'history'
import { Router, Route, Link, browserHistory,IndexRoute} from 'react-router'

import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'

import NavigationClose from 'material-ui/lib/svg-icons/navigation/close';


import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Styles,IconButton} from 'material-ui';
import FlatButton from 'material-ui/lib/flat-button';

injectTapEventPlugin();


class Index extends Component {
  render() {
    return (
      <div>
        <div>
          <AppBar
            title="BlogSystem"
            iconElementLeft={<IconButton><NavigationClose /></IconButton>}
            iconElementRight={<LoginButton />}
          />
        </div>

        {this.props.children}
      </div>
    );
  }
}

render((
  <Router history={browserHistory}>
    <Route path="/" component={Index}>
      <Route path="/posts/new" component={TKForm}/>
      <Route path="/posts/:postId/edit" component={TKForm}/>
      <Route path="/posts/:postId" component={Post}/>

      <Route path="/posts" component={PostList}/>
      <IndexRoute component={Home}/>
    </Route>
  </Router>
), document.getElementById('root'))

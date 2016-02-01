import React, { Component } from 'react';
import { render } from 'react-dom'

import Home from './Home';
import PostList from './PostList';
import Post from './Post';
import Login from './Login';
import TKForm from './Form';
import LoginButton from './LoginButton';
import { createHistory, useBasename } from 'history'
import { Router, Route, Link, browserHistory,IndexRoute} from 'react-router'

import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'

import NavigationClose from 'material-ui/lib/svg-icons/navigation/chevron-left';


import injectTapEventPlugin from 'react-tap-event-plugin';
import {RaisedButton,AppBar,Styles,IconButton,Avatar} from 'material-ui';
import FlatButton from 'material-ui/lib/flat-button';

injectTapEventPlugin();


class Index extends Component {
  render() {
    return (
      <div>
        <div>
          <AppBar
            title="BlogSystem"
            iconElementLeft={<Link to="/" ><IconButton><NavigationClose /></IconButton></Link>}
            iconElementRight={<Avatar src="https://pbs.twimg.com/profile_images/683724768663605248/eh-D6Zy0_normal.jpg" />}
            style={{ margin: 0 }}
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
      <Route path="/login" component={Login}/>

      <Route path="/posts" component={PostList}/>
      <IndexRoute component={PostList}/>
    </Route>
  </Router>
), document.getElementById('root'))

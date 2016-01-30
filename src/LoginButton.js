import React, { Component } from 'react';
import Firebase from 'firebase'
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire'

import {RaisedButton,AppBar,Card,CardMedia,CardHeader,FontIcon,Avatar} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

export default class LoginButton extends Component {
  constructor(props) {
    super(props);

  }
  componentWillMount() {
    if(ref.getAuth()){
      this.state = {isLogin:true};
    }else{
      this.state = {isLogin:false};
    }
    ref.onAuth((data)=>{
      if(data){
        this.setState({isLogin:true,user:{}})
        ref.child("users").child(data.uid).set(data);
        this.bindAsObject(ref.child("users").child(data.uid), "user");
      }else{
        this.setState({isLogin:false})
      }
    })
  }
  handleLogin() {
    ref.authWithOAuthPopup("twitter", function(error, authData) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", authData);
      }
    });
  }
  handleLogout() {
    ref.unauth();
  }
  render() {
    if(this.state.isLogin == false){
      return (
        <RaisedButton label="LOGIN" onClick={this.handleLogin}>
          <FontIcon className="muidocs-icon-custom-github" />
        </RaisedButton>
      );
    }else{
      return (
          <div>
            <Avatar src={this.state.user.twitter.cachedUserProfile.profile_image_url} />
            <RaisedButton label="LOGOUT" onClick={this.handleLogout} />
          </div>
      );
    }

  }
}
reactMixin(LoginButton.prototype,ReactFireMixin)

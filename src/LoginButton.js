import React, { Component } from 'react';
import Firebase from 'firebase'
import {RaisedButton,AppBar,Card,CardMedia,CardHeader,FontIcon} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

export default class Post extends Component {
  constructor(props) {
    super(props);
    if(ref.getAuth()){
      this.state = {isLogin:true};
    }else{
      this.state = {isLogin:false};
    }
    ref.onAuth((data)=>{
      if(data){
        this.setState({isLogin:true})
        ref.child("users").child(data.uid).set(data);
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
        <div>
          <
        </div>
        <RaisedButton label="LOGIN" onClick={this.handleLogin}>
          <FontIcon className="muidocs-icon-custom-github" />
        </RaisedButton>
      );
    }else{
      return (
        <RaisedButton label="LOGOUT" onClick={this.handleLogout}>
          <FontIcon className="muidocs-icon-custom-github" />
        </RaisedButton>
      );
    }

  }
}

import React, { Component } from 'react';
import Firebase from 'firebase'
import reactMixin from 'react-mixin';
import ReactFireMixin from 'reactfire'

import {RaisedButton,AppBar,Card,CardMedia,CardHeader,FontIcon,Avatar} from 'material-ui';

let ref = new Firebase(`https://tks-blog.firebaseio.com/`);

export default class LoginButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin : false
    }
  }
  componentWillMount() {
    if(ref.getAuth()){
      console.log(ref.getAuth())
      this.bindAsObject(ref.child("users").child(ref.getAuth().uid), "user");
      ref.child("users").child(ref.getAuth().uid).on('value',()=>{
        this.setState({isLogin:true})
      })
    }else{
      // this.setState({isLogin:false})
      // ref.onAuth((data)=>{
      //   if(data){
      //     this.setState({isLogin:true})
      //     ref.child("users").child(data.uid).set(data);
      //   }else{
      //     this.setState({isLogin:false})
      //   }
      // })
    }

  }
  handleLogin() {
    ref.authWithOAuthPopup("twitter", function(error, data) {
      if (error) {
        console.log("Login Failed!", error);
      } else {
        console.log("Authenticated successfully with payload:", data);
        ref.child("users").child(data.uid).set(data,()=>{
          ref.child("users").child(data.uid).on('value',()=>{
            this.setState({isLogin:true})
          })
          this.bindAsObject(ref.child("users").child(data.uid), "user");
        });
      }
    });
  }
  handleLogout() {
    ref.unauth();
    this.setState({isLogin:false})
  }
  render() {
    if(this.state.isLogin == false){
      return (
        <RaisedButton label="LOGIN" onClick={this.handleLogin.bind(this)}>
          <FontIcon className="muidocs-icon-custom-github" />
        </RaisedButton>
      );
    }else{
      return (
          <div>
            <Avatar src={this.state.user.twitter.profileImageURL} />
            <RaisedButton label="LOGOUT" onClick={this.handleLogout.bind(this)} />
          </div>
      );
    }

  }
}
reactMixin(LoginButton.prototype,ReactFireMixin)

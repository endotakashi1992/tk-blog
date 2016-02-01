import React, { Component } from 'react';
import Post from './Post';
import Firebase from 'firebase'
import ReactFireMixin from 'reactfire'
import reactMixin from 'react-mixin';
import { Link } from 'react-router'
let ReactRouter = require('react-router')



import {FontIcon,IconButton,RaisedButton,AppBar,Card,CardMedia,CardTitle,CardActions,FlatButton,Avatar,FloatingActionButton} from 'material-ui';
import ContentAdd from 'material-ui/lib/svg-icons/content/add';

let ref = new Firebase(`https://tks-blog.firebaseio.com/posts/`);


let styles = {
  container:{
    display:'flex',
    'flex-wrap':'wrap',
    'justify-content': 'center',
    'align-items': 'center'
  },
  postCard:{
    overflow:'visible',
    width:'400px',
    margin:'20px'
  },
  addButton:{
    position: 'fixed',
    bottom: '20px', /* Adjust to where you want it */
    right: '20px', /* Adjust to where you want it */
    'z-index': '999999999999999999999'
  }
}

export default class PostList extends Component {
  contextTypes() {
    router: React.PropTypes.func.isRequired
  }
  constructor(props) {
    super(props);

    this.state = {posts:[],loading:true};
  }
  componentWillMount() {
    ref.on('value',()=>{
      this.setState({loading:false})
    })
    this.bindAsArray(ref, "posts");
  }
  handleReadMore(e) {
  }

  render() {
    let postList = this.state.posts.map((post)=>{
     if(this.state.loading){
       return;
     }
     let switchEditButton = <p></p>;
    // if(true){
    if(ref.getAuth().uid === post.autor.uid){
      switchEditButton = (
        <Link to={`/posts/${post[".key"]}/edit`}>
          <FlatButton label="EDIT" onClick={this.handleReadMore.bind(this)}/>
        </Link>
      );
    }

      return (
        <Card style={styles.postCard}>
            <CardMedia>
              <img src={post.image}/>
            </CardMedia>
              <CardTitle
                title={post.title}
                subtitle={post.headline}
              />
            <CardActions>
              <Link to={`/posts/${post[".key"]}`}>
              <FlatButton label="MORE" onClick={this.handleReadMore.bind(this)}/>
              </Link>
              {switchEditButton}
            </CardActions>
          </Card>
      )
    })
      return (
        <div style={styles.container}>
          {postList}
          <Link to='/posts/new'>
          <FloatingActionButton style={styles.addButton}>
            <ContentAdd />
          </FloatingActionButton>
          </Link>
        </div>
      );

  }
}


reactMixin(PostList.prototype,ReactFireMixin)

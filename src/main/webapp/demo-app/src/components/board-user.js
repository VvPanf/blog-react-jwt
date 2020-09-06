import React, { Component } from "react";

import UserService from "../services/user-service";
import PostsService from "../services/posts-service";
import {Link} from "react-router-dom";

export default class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: "",
      posts: []
    };
  }

  componentDidMount() {
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
    this.findPosts();
    this.setState({
      user: JSON.parse(sessionStorage.getItem("user"))
    });
  }

  findPosts = () => {
    PostsService.getAllPosts()
      .then(response => response.data)
      .then((data) => {
          this.setState({posts: data});
      });
  }

  deletePost = (postId) => {
      PostsService.deletePost(postId)
        .then(responce => {
          if(responce.data != null)
            this.setState({
              posts: this.state.posts.filter(post => post.id !== postId)
            });
        });
  }

  render() {
    return (
      <div>
        <ul className="list-unstyled">
        {this.state.posts.length === 0
        ?
          <div className="container">
            <header className="jumbotron">
              <h3>{this.state.content}</h3>
              <h3>No Posts Avaliable.</h3>
            </header>
          </div>
        :
        this.state.posts.map((post) => (    
          <li className="media mt-5" key={post.id}>
            <form>
            <img src={post.image}
                  className="mr-3" alt="..." height="64px" width="64px"/>
              <div className="media-body">
              <h5 className="mt-0 mb-1 font-weight-bold">{post.tag} - {post.authorName}</h5>
                {post.text}
              </div>
              {this.state.user.roles.indexOf("ROLE_MODERATOR") != -1 || this.state.user.username == post.authorName ?
                <div>
                    
                      <Link className="btn btn-link" to={"/edit/"+post.id}>edit</Link>{" "}
                      <button type="button" className="btn btn-link" onClick={this.deletePost.bind(this, post.id)}>delete</button>
                </div>
                :
                <></>
              }
            </form>
          </li>
        ))
        }
      </ul>
      <div className="text-center">
        <Link to={"/create"} className="btn btn-primary">Create post</Link>
      </div>
      </div>
    );
  }
}

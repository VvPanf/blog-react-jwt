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
  }

  findPosts = () => {
    PostsService.getAllPosts()
      .then(response => response.data)
      .then((data) => {
          this.setState({posts: data});
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
          <img src={post.image}
                className="mr-3" alt="..." height="64px" width="64px"/>
            <div className="media-body">
            <h5 className="mt-0 mb-1 font-weight-bold">{post.tag} - {post.authorName}</h5>
              {post.text}
            </div>
            <div>
              <Link to={"/edit/"+post.id}>edit</Link>{" "}
              <href>delete</href>
            </div>
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

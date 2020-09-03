import React, {Component} from "react";
import PostsService from "../services/posts-service";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth-service";

export default class PostPage extends Component {
    initialState = {id:"", tag:"", text:"", authorName:"", image:""};

    constructor(props) {
        super(props);
        this.state = this.initialState;
        this.state.show = false;
        this.postEdit = this.postEdit.bind(this);
        this.postSubmit = this.postSubmit.bind(this);
    }

    componentDidMount() {
        const postId = +this.props.match.params.id;
        if(postId) {
            this.findPostById(postId);
        }
    }

    findPostById = (postId) => {
        PostsService.findById(postId)
            .then(responce => responce.data)
            .then(data => {
                if(data != null) {
                    this.setState({
                        id: data.id,
                        tag: data.tag,
                        text: data.text,
                        authorName: data.authorName,
                        image: data.image
                    });
                }
            }).catch(error => {
                console.error("Error - " + error);
            })
    }


    postSubmit = (event) => {
        event.preventDefault();
        
        const username = AuthService.getCurrentUser().username;
        const post = {
            tag: this.state.tag,
            text: this.state.text,
            authorName: username,
            image: this.state.image
        };

        PostsService.savePost(post)
            .then(responce => responce.data)
            .then(data => {
                if(data != null) {
                    this.setState({show: true, method: "post"});
                    setTimeout(()=>this.setState({show:false}), 3000);
                } else {
                    this.setState({show:false});
                }
            });
    }

    postEdit = (event) => {
        event.preventDefault();
        
        const post = {
            id: this.state.id,
            tag: this.state.tag,
            text: this.state.text,
            authorName: this.state.authorName,
            image: this.state.image
        };

        PostsService.editPost(post)
        .then(responce => responce.data)
        .then(data => {
            if(data != null) {
                this.setState({show: true, method: "put"});
                setTimeout(()=>this.setState({show:false}), 3000);
            } else {
                this.setState({show:false});
            }
        });
    }

    postChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    };

    postList = () => {
        //return this.props.history.push("/user");
    };

    render() {
        const {id, tag, text, authorName, image} = this.state;
        return (
            <div>
                <Form onSubmit={id ? this.postEdit : this.postSubmit} id="postFormId">
                    <div className="form-group">
                        <label for="tagInput">Tag</label>
                        <Input type="text" className="form-control" 
                        id="tagInput" value={tag}
                        onChange={this.postChange} name="tag"/> 
                    </div>
                    <div className="form-group">
                        <label for="imageInput">Image</label>
                        <Input type="text" className="form-control" 
                        id="imageInput" value={image}
                        onChange={this.postChange} name="image"/> 
                    </div>
                    <div className="form-group">
                    <label for="textInput">Text</label>
                        <TextArea className="form-control" id="textInput"
                         rows="10" value={text}
                         onChange={this.postChange} name="text"/>
                    </div>
                    <div className="form-group text-center">
                        <CheckButton type="submit" className="btn btn-primary" 
                            onClick={this.postList.bind()}>
                            Submit
                        </CheckButton>
                    </div>
                </Form>
            </div>
        );
    }
}
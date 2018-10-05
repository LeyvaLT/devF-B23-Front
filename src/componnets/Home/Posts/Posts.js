import React, {Component} from 'react';
import Comments from './Comments/Comments';
import AddComment from './Comments/AddComment';
import Likes from './Likes/Likes';
import AddLikes from './Likes/AddLike';
import './Post.css';




class Movie extends Component{

    render(){
        return(
            <div className="col-md d-flex align-items-stretch">
                <div className="card">
                    <img className="post-photo-profile" src={this.props.photo_profile} width="100px"/>
                    <h5 className="post-nickname-profile">
                        <strong>{this.props.nickname}</strong>
                    </h5>
                    <img className="card-img-top" src={this.props.photo} width="20%"/>
                    <div className="card-body">
                        <h5 className="card-title"><strong>{this.props.title}</strong></h5>
                        <Likes post_id={this.props.id}/>
                        <AddLikes post_id={this.props.id}/>
                        <Comments post_id={this.props.id}/>
                        <AddComment post_id={this.props.id}/>
                    </div>
                </div>
            </div>
        )
    }

}

export default Movie;
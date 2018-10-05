import React, {Component} from 'react';

class Post extends Component{

    render(){
        return(
            <div className="card">
                <h5>{this.props.title}</h5>
                <img src={this.props.photo} width="300px"/>
            </div>
        );
    }

}

export default Post;

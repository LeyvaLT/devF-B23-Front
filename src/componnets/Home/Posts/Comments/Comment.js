import React, {Component} from 'react';

class Comment extends Component{
     render(){
         return(<div className="card">
             <h5><strong>{this.props.nickname}</strong></h5>
             <img src={this.props.photo_profile} width="80px"/>
             <p className="card-text">{this.props.comment}</p>
         </div>)
     }
 }

 export default Comment;

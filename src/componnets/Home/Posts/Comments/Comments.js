import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import Comment from './Comment';


const QUERY_COMMENTS = gql `
query post_comments($post_id:ID!){
  post_comments(post_id:$post_id){
    comment
    user{
      nickname,
      photo_profile
    }
  }
}
`;

class Comments extends Component{


    getComments = () => (
        <Query query={QUERY_COMMENTS} variables={{post_id:this.props.post_id}}>
            {
                ({loading, err, data}) => {
                    console.log(data);
                    if (loading) return 'Loading...';
                    if (err) return 'Error del Servicio';
                    return data.post_comments.map(comment => <Comment

                        comment={comment.comment}
                        nickname={comment.user.nickname}
                        photo_profile={comment.user.photo_profile}

                    />);
                }
            }
        </Query>
    );

    render(){
        return(
            <div>
                {this.getComments()}
            </div>
        )

    }
}

export default Comments;

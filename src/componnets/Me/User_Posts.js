import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import Post from './Post';

const QUERY_FOLLOWERS = gql `
    query user_posts{
      user_posts{
        title,
        photo
      }
    }
`;


class User_Posts extends Component{
    render(){
        return(
            <Query query={QUERY_FOLLOWERS}>
                {
                    ({loading, error, data}) => {
                        if (loading) return ("Loading...");
                        if (error) return ({error});
                        return data.user_posts.map(post => <Post
                            title={post.title}
                            photo={post.photo}
                        /> )
                    }
                }
            </Query>
        )
    }
}

export default User_Posts;

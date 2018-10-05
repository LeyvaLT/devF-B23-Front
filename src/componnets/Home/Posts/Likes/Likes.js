import React, {Component} from 'react';
import {Query} from "react-apollo";
import gql from "graphql-tag";


const QUERY_LIKES = gql `
    query post_likes($post_id:ID!){
      post_likes(post_id:$post_id){
        post{
          title
        }
      }
    }
`;


class Likes extends Component{



    getLikes = () => (
        <Query query={QUERY_LIKES} variables={{post_id:this.props.post_id}}>
            {
                ({loading, err, data}) => {
                    console.log(data);
                    if (loading) return 'Loading...';
                    if (err) return 'Error del Servicio';
                    return data.post_likes.length
                }
            }
        </Query>
    );

    render(){
        return(
         <strong>Likes: {this.getLikes()}</strong>
        )
    }
}

export default Likes;

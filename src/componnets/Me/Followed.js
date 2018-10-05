import React, {Component} from 'react';
import {Query} from 'react-apollo';
import User from '../User/User';
import gql from 'graphql-tag';

const QUERY_FOLLOWERS = gql `
    query followed{
      user_followed{
        follower{
          id
          nickname
        }
      }
    }
`;


class Followers extends Component{
    render(){
        return(
            <Query query={QUERY_FOLLOWERS}>
                {
                    ({loading, error, data}) => {
                        if (loading) return ("Loading...");
                        if (error) return ({error});
                        return data.user_followed.map(followed => <User
                            user_id={followed.follower.id}
                        /> )
                    }
                }
            </Query>
        )
    }
}

export default Followers;

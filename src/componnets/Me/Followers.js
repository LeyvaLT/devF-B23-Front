import React, {Component} from 'react';
import {Query} from 'react-apollo';
import User from '../User/User';
import gql from 'graphql-tag';

const QUERY_FOLLOWERS = gql `
    query followers{
      user_followers{
        followed{
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
                        return data.user_followers.map(followers => <User
                            user_id={followers.followed.id}
                        /> )
                    }
                }
            </Query>
        )
    }
}

export default Followers;

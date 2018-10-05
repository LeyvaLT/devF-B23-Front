import React, {Component} from 'react';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';


const QUERY_USER = gql`

    query user($user_id:ID!){
      user(user_id: $user_id){
        photo_profile
        nickname
      }
    }

`;


class User extends Component {

    render() {
        return (
            <Query query={QUERY_USER} variables={{user_id: this.props.user_id}}>
                {
                    ({loading, err, data}) => {
                        console.log(data);
                        if (loading) return 'Loading...';
                        if (err) return 'Error del Servicio';
                        return (<div className="card">
                            <img src={data.user.photo_profile} width="80px"/>
                            <h5>{data.user.nickname}</h5>
                        </div>)
                    }
                }
            </Query>
        )
    }

}


export default User;


import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import FormME from './FormMe';
import Followers from './Followers';
import Followed from './Followed';
import Post from './User_Posts';
import AddPost from '../Home/Posts/AddPost';
import './Me.css';



const GET_ME = gql`
    query{
        me{
           name,
           nickname,
           email,
           birth_date,
           biography,
           photo_profile
        }

    }
`;


class Me extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            nickname: "",
            email: "",
            birth_date: "",
            biography: "",
            photo_profile: ""
        }
    }


    render() {
        return (
            <div>
                <Query query={GET_ME}>
                    {
                        ({loading, error, data}) => {
                            if (loading) return ("Loading...");
                            if (error) return ({error});
                            return (<div className="row container-fluid">
                                    <div className="profile">
                                        <h2>Perfil</h2>
                                        <FormME data={data.me}/>
                                    </div>
                                    <div className="followers">
                                        <h3>Seguidores</h3>
                                        <Followers/>
                                    </div>
                                    <div className="followed">
                                        <h3>Seguiendo</h3>
                                        <Followed/>
                                    </div>

                                    <div className="post">
                                        <h3>Mis Publicaciones</h3>
                                        <Post/>
                                    </div>

                                    <div className="add-post">
                                        <AddPost/>
                                    </div>
                                </div>
                            )
                        }
                    }
                </Query>
            </div>
        )

    }
}

export default Me;

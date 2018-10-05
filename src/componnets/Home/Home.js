import  React, {Component} from 'react';
import Navbar from './Navbar';
import Post from './Posts/Posts';
import {Query} from 'react-apollo';
import gql from 'graphql-tag';
import './Home.css';

const QUERY_ME = gql`
        query me{
          me{
            nickname
          }
        }
`;
const QUERY_POSTS = gql`
    query posts {
        posts{
            id
            title
            photo
            user{
                nickname,
                photo_profile
            }
        }
    }
`;

class Home extends Component{


    constructor(props) {
        super(props);

        this.state = {
            nickname: "Edgar Leyva"
        }

    }

    getMe = () => (
        <Query query={QUERY_ME}>
            {({loading, err, data}) => {
                if (loading) return 'Loading...';
                if (err) return 'Error del Servicio';
                console.log(data);
                return <Navbar nickname= {data.me.nickname} />
            }}
        </Query>
    );

    renderPosts = () => (
        <Query query={QUERY_POSTS}>
            {
                ({loading, err, data}) => {
                    console.log(data);
                    if (loading) return 'Cargando tus posts...';
                    if (err) return 'Error del Servicio';
                    return data.posts.map(post => <Post
                        title={post.title}
                        photo={post.photo}
                        photo_profile={post.user.photo_profile}
                        nickname={post.user.nickname}
                        id={post.id}/>);
                }
            }
        </Query>
    );

    render() {
        return (
            <div className="cover">
                {this.getMe()}
                <div className="row">
                    {this.renderPosts()}
                </div>

            </div>
        )
    }

}

export default Home;

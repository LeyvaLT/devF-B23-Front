import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../../Firebase/Firebase';
import gql from 'graphql-tag';


const MUTATION_ADDPOST = gql `

mutation addPost(
    $title:String!,
    $photo:String!
){
  addPost(
    title: $title
    photo: $photo
  ){
    user{
      nickname,
      email
    }
  }
}


`;



class AddPost extends Component{
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            photo: ''
        }
    }


    onInputChange = (event) => {
        let {id, value} = event.target;
        this.setState({
            [id]: value
        });
    };


    onFormSubmit = (event, addPost) => {
        event.preventDefault();
        console.log(this.state);
        addPost({
            variables: {
                title: this.state.title,
                photo: this.state.photo,

            }
        })
            .then(response =>{
                console.log(response);
                alert('Post agregado');
            })
            .catch(error =>{
                console.log(error);
                alert('Todo mal :(')
            });
    };

    uploadFile = async (filename) => {
        let url = await Firebase.storage().ref('photo_post').child(filename).getDownloadURL();
        this.setState({photo:url});
    };

    render(){
        return(
            <Mutation mutation={MUTATION_ADDPOST}>
                {
                    (addPost,{data}) => (
                        <div>
                            <h2>Agregar Publicacion</h2>
                            <img src={this.state.photo} name="photo_profile" className="img-fluid img-rounded" width="150" height="150"/>
                            <form onSubmit={(event) =>this.onFormSubmit(event, addPost)}>
                                <div className="form-group">
                                    <label>Titulo</label>
                                    <input type="text" className="form-control" placeholder="Titulo"
                                           id="title"
                                           onChange={this.onInputChange}
                                           value={this.state.title}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="">Foto: </label>
                                    <FileUploader
                                        className="btn btn-danger"
                                        name="photo_profile"
                                        accept="image/*"
                                        randomizeFilename
                                        storageRef={
                                            Firebase.storage().ref('photo_post')
                                        }
                                        onUploadError={(err) => console.log(err)}
                                        onUploadSuccess={this.uploadFile}

                                    />
                                </div>
                                <button type="submit" className="btn btn-success">Publicar</button>
                            </form>
                        </div>
                    )
                }
            </Mutation>
        )
    }


}


export default AddPost;


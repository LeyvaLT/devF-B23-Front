import React, {Component} from 'react';
import FileUploader from 'react-firebase-file-uploader';
import Firebase from '../../Firebase/Firebase';
import {Mutation} from 'react-apollo';
import gql from "graphql-tag";



const UPDATE_ME = gql`

    mutation updateUser(
        $name: String,
        $email: String,
        $birth_date: String,
        $biography: String,
        $photo_profile: String
    ){
        updateUser(
            name: $name,
            email: $email,
            birth_date: $birth_date,
            biography: $biography,
            photo_profile: $photo_profile
        ){
            id,
            name,
            nickname,
            email,
            birth_date,
            biography,
            photo_profile
        }
    }
`;


class FormMe extends Component {

    constructor(props) {
        super(props);
        this.state = {...props.data};
    }

    handleImput = (event) => {
        //event.preventDefault();
        let {name, value} = event.target;
        this.setState({[name]: value})
    };

    formSubmit = (e, updateUser) => {
        e.preventDefault();
        console.log(this.state);
        updateUser(
            {variables: {...this.state}}
        );
    };

    uploadFile = async (filename) => {
        let url = await Firebase.storage().ref('photo_profile').child(filename).getDownloadURL();
        this.setState({photo_profile:url});
    };

    render() {

        return (

            <Mutation mutation={UPDATE_ME}>
                {
                    (updateUser, {data}) => (
                        <div className="row justify-content-center me">
                            <div className="col-md-9">
                                <img src={this.state.photo_profile} name="photo_profile" className="img-fluid img-rounded" width="150" height="150"/>
                                <form onSubmit={(e) => this.formSubmit(e, updateUser)}>
                                    <div className="form-group">
                                        <label htmlFor="">Nombre:</label>
                                        <input type="text" className="form-control" name="name" value={this.state.name}
                                               onChange={this.handleImput}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Nickname:</label>
                                        <input type="text" className="form-control" name="nickname"
                                               value={this.state.nickname} onChange={this.handleImput} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Email:</label>
                                        <input type="email" className="form-control" name="email"
                                               value={this.state.email} disabled/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Fecha de Nacimiento:</label>
                                        <input type="text" className="form-control" name="birth_date"
                                               value={this.state.birth_date} onChange={this.handleImput}/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="comment">Biografia:</label>
                                        <textarea className="form-control" rows="5" id="biography" name="biography" onChange={this.handleImput}>
                                            {this.state.biography}
                                        </textarea>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="">Foto: </label>
                                        <FileUploader
                                            className="btn btn-danger"
                                            name="photo_profile"
                                            accept="image/*"
                                            randomizeFilename
                                            storageRef={
                                                Firebase.storage().ref('photo_profile')
                                            }
                                            onUploadError={(err) => console.log(err)}
                                            onUploadSuccess={this.uploadFile}

                                        />
                                    </div>
                                    <button type="submit" className="btn btn-info">Guardar</button>
                                </form>
                            </div>
                        </div>
                    )

                }

            </Mutation>
        )
    }

}

export default FormMe;

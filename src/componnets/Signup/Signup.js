import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

// Equivalente a una Peticion REST
const CREATE_USER = gql`
   mutation signup($email: String!, $nickname: String!, $password: String!){
      signup(
        email: $email,
        nickname: $nickname,
        password: $password
      ){
        token,
        user{
          id,
          nickname,
          email
        }  
  }
  
}
`;

class Signup extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            nickname: '',
            password: ''
        }
    }

    onInputChange = (event) => {
        let {id, value} = event.target;
        this.setState({
            [id]: value
        });
    };

    onFormSubmit = (event, signup) => {
        event.preventDefault();
        console.log('Ya le puche al boton');
        console.log(this.state);
        signup({
            variables: {
                email: this.state.email,
                nickname: this.state.nickname,
                password: this.state.password
            }
        })
            .then(response =>{
                console.log(response);
                this.props.history.push('/login');
                alert('Todo chido carnal, ahora logeate')
            })
            .catch(error =>{
                console.log(error);
                alert('Todo mal :(')
            });
    };

    render() {
        return (
            <Mutation mutation={CREATE_USER}>
                {(signup, {data}) => (
                    <div>
                        <form onSubmit={(e) => this.onFormSubmit(e, signup)}>
                            <div className="form-group">
                                <label>Email address</label>
                                <input type="email" className="form-control" placeholder="Enter email"
                                       id="email"
                                       onChange={this.onInputChange}
                                       value={this.state.email}
                                />
                            </div>
                            <div className="form-group">
                                <label>nickName</label>
                                <input type="text" className="form-control" placeholder="Enter a nickname"
                                       id="nickname"
                                       onChange={this.onInputChange}
                                       value={this.state.nickname}
                                />
                            </div>

                            <div className="form-group">
                                <label>Password</label>
                                <input type="password" className="form-control" placeholder="Enter password"
                                       id="password"
                                       onChange={this.onInputChange}
                                       value={this.state.password}
                                />
                            </div>
                            <button type="submit" className="btn btn-success">Registrarme</button>
                        </form>
                    </div>
                )}
            </Mutation>

        )
    }
}

export default Signup;
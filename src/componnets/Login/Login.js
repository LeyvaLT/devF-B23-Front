import React, {Component} from 'react';
import gql from 'graphql-tag';
import {Mutation} from 'react-apollo';

const MUTATION_LOGIN = gql `

        mutation login ($email:String!, $password:String!) {
          
          login(
            email: $email
            password: $password
          ){
            token
                user{
              name
            }
          }
          
        }

`;



class Login extends Component{

    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: ""
        }
    }

onInputChange = (event) => {
    // target trae toda la info del input o etiqueta
    let {id, value} = event.target;
    this.setState({
        [id] : value
    });
};

    onFormSubmit = (event, login) => {
        event.preventDefault(); // para que no se recargue la pagina
        login({
          variables: {
              email: this.state.email,
              password: this.state.password
          }
        })
            .then(response => {
                localStorage.setItem('token',response.data.login.token);
                //console.log(response.data.login.token);
                alert('Ya te logeaste carnal');
            })
            .catch(error =>{
                //console.log(error);
                alert('correo o contraseña incorrectos carnal');
            })
    };

    render(){
        return(
            <Mutation mutation={MUTATION_LOGIN}>
                {
                    (login,{data}) => (
                        <div>
                            <form onSubmit={(event) =>this.onFormSubmit(event, login)}>
                                <div className="form-group">
                                    <label>Email address</label>
                                    <input type="email" className="form-control" placeholder="Enter email"
                                           id="email"
                                           onChange={this.onInputChange}
                                           value={this.state.email}
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
                                <button type="submit" className="btn btn-success">Iniciar Sesion</button>
                            </form>
                        </div>
                    )
                }
            </Mutation>
        )
    }

}

export default Login;

import React, {Component} from 'react';
import {Route, BrowserRouter as Router, Redirect} from 'react-router-dom'
import {ApolloProvider} from 'react-apollo'
import client from './graphql'
import Login from './componnets/Login/Login'
import Signup from './componnets/Signup/Signup'
import Home from './componnets/Home/Home'
import isAuthenticated  from './resolvers/isAuthenticated'


class Routes extends Component {
    render() {



        const PrivateRoute = ({component:Component, ...rest}) => (
            <Route {...rest} render={(props) => (

                isAuthenticated() === true
                    ? <Component {...props} />
                    : <Redirect to="/login"/>

            )} />
        );

        return (
            <Router>
                <ApolloProvider client={client}>
                    <main>
                        <PrivateRoute exact path='/' component={Home}/>
                        <Route exact path='/login' component={Login}/>
                        <Route exact path='/signup' component={Signup}/>
                    </main>
                </ApolloProvider>
            </Router>
        )
    }
}
// Singleton; appollo provide encapsula a toda nuestra aplicacion de la funcionalidad de apollo provider
// tambien se puede utilizar redux -> apollo encapsula a redux -> apolo le da salida a tus peticiones
export default Routes;

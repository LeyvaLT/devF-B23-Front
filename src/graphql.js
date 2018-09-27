import {ApolloClient} from 'apollo-client'
import {createHttpLink} from 'apollo-link-http'
import {setContext} from 'apollo-link-context'
import {InMemoryCache} from 'apollo-cache-inmemory'

// Obtenemos el Endpoint de nuestro Graphql
const httpLink = createHttpLink({
    uri:"http://netflix-clone-b23.herokuapp.com/"
});


// guardamos nuestro jwt dentro de los headers
const authLink = setContext((_,{headers})=>{
    const token= localStorage.getItem('token');
    return {
        headers: {
            ...headers, //sprit object
            authorization: token ? `JWT ${token}` : ''
        }
    }
});

// crea un nuevo objeto de apollo client
const client = new ApolloClient({
    link:authLink.concat(httpLink),
    cache: new InMemoryCache()
});

export default client;

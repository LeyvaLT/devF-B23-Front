import React,{Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const MUTATION_ADDLIKE = gql `

mutation addLike($post_id: ID!){
  addLike(
    post_id: $post_id
  ){
    post{
      title
    }
    user{
      nickname
    }
  }
}
`;


class AddLike extends Component{


    onFormSubmit = (event, addLike) => {
        event.preventDefault(); // para que no se recargue la pagina
        addLike({
            variables: {
                post_id: this.props.post_id
            }
        })
            .then(response => {
                //console.log(response.data.login.token);
                //this.props.history.push('/');
                alert('Ya le diste Like carnal');
            })
            .catch(error =>{
                console.log(error);
                alert('ya le habias dado like carnal, no te pases');
            })
    };

    render(){
        return(
            <Mutation mutation={MUTATION_ADDLIKE}>
                {
                (addLike, {data}) => (
                <div>
                    <form onSubmit={(event) => this.onFormSubmit(event, addLike)}>
                        <button type="submit" className="btn btn-danger">Dar Like</button>
                    </form>
                </div>
                )
                }
            </Mutation>
        )
    }


}

export default AddLike;


import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import gql from 'graphql-tag';

const MUTATON_ADDCOMMENT = gql `

    mutation addComment($post_id: ID!, $comment: String!){
      addComment(
        post_id: $post_id,
        comment: $comment,
      ){
        post{
          title,
          photo
        },
        user{
          nickname,
          email
        }
  }
}

`;




class AddComment extends Component{


    constructor(props){
        super(props);
        this.state = {
            comment:""
        };
    }

    handleImput = (event) => {
        //event.preventDefault();
        let {name, value} = event.target;
        this.setState({[name]: value})
    };

    onFormSubmit = (event, addComment) => {
        event.preventDefault(); // para que no se recargue la pagina
        addComment({
            variables: {
                post_id: this.props.post_id,
                comment: this.state.comment
            }
        })
            .then(response => {
                //console.log(response.data.login.token);
                //this.props.history.push('/');
                alert('Ya comentaste carnal');
            })
            .catch(error =>{
                console.log(error);
                alert('Error :(');
            })
    };

    render(){
        return(
            <Mutation mutation={MUTATON_ADDCOMMENT}>
                {
                    (addComment, {data}) => (
                        <div>
                            <form onSubmit={(event) => this.onFormSubmit(event, addComment)}>
                                <div className="form-group">
                                    <label htmlFor="comment">Biografia:</label>
                                    <textarea className="form-control" rows="5" id="biography" name="comment" onChange={this.handleImput}>
                                        {this.state.comment}
                                        </textarea>
                                </div>
                                <button type="submit" className="btn btn-success">Comentar</button>
                            </form>
                        </div>
                    )
                }
            </Mutation>
        )
    }
}

export default AddComment;

import  React, {Component} from 'react';
import './Navbar.css';
import {Link} from 'react-router-dom';

class Navbar extends Component{

    render() {
        return(
            <nav className="Navbar_name navbar navbar-expand-lg navbar-light bg-dark">
                <Link to="/me">
                    <h4>Hola {this.props.nickname}</h4>
                </Link>
            </nav>
        )
    }

}

export default Navbar;
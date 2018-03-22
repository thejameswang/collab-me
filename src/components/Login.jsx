// Importing needed npm packages
import React from 'react';
import axios from 'axios';
const dbUrl = "/db";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom';
//Imports Document component and redux requirements
import Documents from './Documents.jsx';
import {setUser} from '../actions/index'

//Creates login react component
class Login extends React.Component {
    constructor(props) {
        super(props);
        //establishes loggedIn: boolean, username: String, password:String states
        this.state = {
            loggedIn: false,
            username: '',
            password: ''
        }
    }
    //handles username and password state change binded to inputs
    handleInputChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }
    //handles form submit
    handleSubmit(e) {
        //prevents incorrect continuation
        e.preventDefault();
        let self = this;
        //creates user
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        //Sends user data to the backend for validation
        //Prevents callback hell with axios promise requests
        axios.post('http://localhost:3000/login', user).then(function(response) {
            self.props.getUser(response.data);
        }).then(function(response) {
            self.props.history.push('/documents');
        }).catch(function(error) {
            self.props.history.push('/signup');
        });

    }
    //Rendering
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-title">
                        LOGIN
                    </div>
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="text" name="username" className="form-control" id="username" onChange={this.handleInputChange.bind(this)} value={this.state.username}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="row">

                                    <div className="col-xs-12">

                                        <div className="col-xs-6">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
                                        </div>
                                        <div className="col-XS-6">
                                            <Link to="/signup" className="btn btn-outline-secondary">REGISTER</Link>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>);
    }
};
//Redux requirements
const mapStateToProps = (state) => {
    return {user: state.user};
}

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (user) => {
            dispatch(setUser(user))
        }
    }
}

// Promote App from a component to a container
Login = connect(mapStateToProps, mapDispatchToProps)(Login);
//Export component
export default Login;

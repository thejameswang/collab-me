// Importing needed npm packages
import React from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

//Creates Signup/Register react component
class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        //Creates new User
        const body = {
            username: this.state.username,
            password: this.state.password
        }
        //Sends new user to check if the user was created
        axios.post('http://localhost:3000/register', body).then(function(response) {
            self.props.history.push('/');
        }).catch(function(error) {
            console.log(error);
            self.props.history.push('/signup');
        });
    }
    //Renders Sign up page
    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <div className="col-lg-12 login-title">
                        SIGN UP
                    </div>
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">USERNAME</label>
                                    <input type="text" className="form-control" name="username" id="username" onChange={this.handleInputChange.bind(this)} value={this.state.username}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" className="form-control" name="password" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="row">
                                    <div className="col-xs-12">
                                        <div className="col-xs-6"></div>
                                        <div className="col-xs-6">
                                            <button type="submit" className="btn btn-outline-primary">REGISTER</button>
                                            <Link to="/" className="btn btn-outline-secondary">LOGIN</Link>
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

export default Signup;

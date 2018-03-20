import React from 'react';
import axios from 'axios';
const dbUrl = "/db";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';

 class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        console.log(this.props);
    }

    handleInputChange(event)  {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e){
        e.preventDefault();
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-2"></div>
                    <div className="col-lg-6 col-md-8 login-box">
                        <div className="col-lg-12 login-key">
                            <i className="fa fa-key" aria-hidden="true"></i>
                        </div>
                        <div className="col-lg-12 login-title">
                            HACKMATE
                        </div>
                        <div className="col-lg-12 login-form">
                            <div className="col-lg-12 login-form">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label className="form-control-label">EMAIL</label>
                                        <input type="text" name="email" className="form-control" id="email" onChange={this.handleInputChange.bind(this)} value={this.state.email} />
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type="password" name="password" className="form-control" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password} />
                                    </div>

                                    <div className="col-lg-12 loginbttm">
                                        <div className="col-lg-6 login-btm login-text"></div>
                                        <div className="col-lg-6 login-btm login-button">
                                            <button type="submit" className="btn btn-outline-primary">LOGIN</button>
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

export default Login;

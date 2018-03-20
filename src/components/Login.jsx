import React from 'react';
import axios from 'axios';
const dbUrl = "/db";
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {Link, Route} from 'react-router-dom';
import Documents from './Documents.jsx';
import {setUser} from '../actions/index'

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loggedIn: false,
            username: '',
            password: ''
        }
    }

    handleInputChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        const user = {
            username: this.state.username,
            password: this.state.password
        }
        axios.post('http://localhost:3000/login', user)
        .then(function(response) {
            self.props.getUser(response.data);
        }).then(function(response) {
            self.props.history.push('/documents');
        })
        .catch(function(error) {
            self.props.history.push('/signup');
        });

    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8">
                    <div className="col-lg-12">
                        COLLAB.ME
                    </div>
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">Username</label>
                                    <input type="text" name="username" className="form-control" id="username" onChange={this.handleInputChange.bind(this)} value={this.state.username}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">PASSWORD</label>
                                    <input type="password" name="password" className="form-control" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password}/>
                                </div>

                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-xs btn-default">LOGIN</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <Link to="/signup" className="btn btn-xs btn-default">Signup</Link>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
        </div>);
    }
};


const mapStateToProps = (state) => {
    return {
        user: state.user
    };
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


export default Login;

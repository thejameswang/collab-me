import React from 'react';
import axios from 'axios';
import {Link, Route} from 'react-router-dom';

class Signup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
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
        const body = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:3000/register', body).then(function(response) {
            console.log(response);
            self.props.history.push('/');
        }).catch(function(error) {
            console.log(error);
            self.props.history.push('/signup');

        });

    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8">
                    <div className="col-lg-12">
                        Sign Up
                    </div>

                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">Username</label>
                                    <input type="text" className="form-control" name="username" id="username" onChange={this.handleInputChange.bind(this)} value={this.state.username}/>
                                </div>
                                <div className="form-group">
                                    <label className="form-control-label">Password</label>
                                    <input type="password" className="form-control" name="password" id="password" onChange={this.handleInputChange.bind(this)} value={this.state.password}/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-xs btn-default">Register</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
            <Link to="/" className="btn btn-xs btn-default">Login</Link>
        </div>);
    }
};

export default Signup;

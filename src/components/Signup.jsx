import React from 'react';
import axios from 'axios';

let Signup = () => {
    let input = {
        username: '',
        password: ''
    };

    let handleSubmit = (e) => {
        e.preventDefault();

        if (input) {
            axios.post('http://localhost:3000/register', {
                username: input.username.value,
                password: input.password.value
            })
            .then(function(response) {
                console.log(response);
                input = {
                    username: '',
                    password: ''
                };
            }).catch(function(error) {
                console.log(error);
            });


        }
    }

    return (<div className="container">
        <div className="row">
            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8">
                <div className="col-lg-12">
                    <i className="fa fa-key" aria-hidden="true"></i>
                </div>
                <div className="col-lg-12">
                    Sign Up
                </div>

                <div className="col-lg-12">
                    <div className="col-lg-12">
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-control-label">USERNAME</label>
                                <input type="text" className="form-control" id="username" ref={text => input.username = text}/>
                            </div>
                            <div className="form-group">
                                <label className="form-control-label">PASSWORD</label>
                                <input type="password" className="form-control" id="password" ref={text => input.password = text}/>
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
    </div>);
};

export default Signup;

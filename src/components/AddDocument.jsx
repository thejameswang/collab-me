import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import {addDocument} from '../actions/index'

const dbUrl = "/db";

class AddDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ''
        };
    }

    handleInputChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        let self = this;
        let newDoc;
        axios.post('http://localhost:3000/add', {
            name: self.state.name,
            owner: self.props.user,
            content: "",
            rawContent: '{}'
        }).then(function(response) {
            self.props.createDocument(response.data);
            newDoc = response.data;
        }).then(function(response) {
            self.props.history.push({pathname: '/edit', state: { current: newDoc }});
        }).catch(function(error) {
            console.log(error);
        });

    }

    render() {
        return (<div>
                    <div className="col-lg-12 login-title">
                        CREATE NEW DOCUMENT
                    </div>
                    <div className="col-lg-12 login-form">
                        <div className="col-lg-12 login-form">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">DOC NAME</label>
                                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-outline-primary">Create</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {documents: state.documents, user: state.user};
}

const mapDispatchToProps = (dispatch) => {
    return {
        createDocument: (doc) => {
            dispatch(addDocument(doc))
        }
    }
}

// Promote App from a component to a container
AddDocument = connect(mapStateToProps, mapDispatchToProps)(AddDocument);

export default AddDocument;

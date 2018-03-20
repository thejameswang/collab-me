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
        axios.post('http://localhost:3000/add', {
            name: self.state.name,
            owner: self.props.user,
            content: ""
        }).then(function(response) {
            self.props.createDocument(response.data);
        }).catch(function(error) {
            console.log(error);
        });

    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8">
                    <div className="col-lg-12">
                        <h5>Create New Document</h5>
                    </div>
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">Name:</label>
                                    <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-xs btn-default">Create</button>
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

import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {BrowserRouter} from 'react-router-dom'
import {addDocument} from '../backend/actions/index'

const dbUrl = "/db";


class AddDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            password: ''
        };
    }

    handleInputChange(event)  {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createDocument(this.state.name, this.state.password);

        let self = this;
        const state = this.state;

        axios.post(dbUrl + '/document', {
            name: state.name,
            password: state.description,
            owner: this.props.user,
            collaborators: {}
        }).then(function(response) {
            console.log(response);
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
                            Create Document
                        </div>
                        <div className="col-lg-12">
                            <div className="col-lg-12">
                                <form onSubmit={this.handleSubmit.bind(this)}>
                                    <div className="form-group">
                                        <label className="form-control-label">NAME</label>
                                        <input type="text" name="name" className="form-control" value={this.state.name} onChange={this.handleInputChange.bind(this)}/>
                                    </div>
                                    <div className="form-group">
                                        <label className="form-control-label">PASSWORD</label>
                                        <input type="text" name="password" className="form-control" value={this.state.password} onChange={this.handleInputChange.bind(this)}/>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="col-lg-6"></div>
                                        <div className="col-lg-6">
                                            <button type="submit" className="btn btn-primary">CREATE</button>
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
    return {
        documents: state.documents,
        user: state.user
    };
  }

  const mapDispatchToProps = (dispatch) => {
    return {
        createDocument: (doc, user) => {
        dispatch(addDocument(doc, user))
    },
        getDocuments: (user) => {
        dispatch(fetchDocuments(user))
    }
    }
  }


  // Promote App from a component to a container
  AddDocument = connect(mapStateToProps, mapDispatchToProps)(AddDocument);

  export default AddDocument;

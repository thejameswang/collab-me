import React from 'react';
import axios from 'axios';
import Document from './Document.jsx'
import AddDocument from './AddDocument.jsx'
import ViewShared from './ViewShared.jsx'
import {bindActionCreators} from 'redux'
import {setDocuments} from '../actions/index.js'
import {deleteUser} from '../actions/index.js'
import {connect} from 'react-redux';

class Documents extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        let self = this;
        axios.get('http://localhost:3000/documents',{ params: { id: self.props.user._id}
        }).then(function(response) {
          self.props.setDocs(response.data);
        }).catch(function(error) {
          console.log(error);
        });
    }

    logout() {
        let self = this;
        axios.get('http://localhost:3000/logout'
        ).then(function(response) {
            self.props.clearUser(self.props.user);
            self.props.setDocs({});
        }).then(function(response) {
            self.props.history.push('/');
        }).catch(function(error) {
          console.log(error);
        });
    }

    render() {

        return (<div className="container">
            <button type="submit" onClick={this.logout.bind(this)} className="btn btn-xs btn-default">Logout</button>
            <AddDocument/>
            <h5>List of Documents:</h5>
            <ul>
                {this.props.documents.length > 0 ? this.props.documents.map((doc) => <Document key={doc.id} doc={doc.name}/>) : ''}
            </ul>
            <ViewShared/>
        </div>);
    }
}

const mapStateToProps = (state) => {
  return {
    documents: state.documents,
    user: state.user
  };
}

// mapStateToProps is here
const mapDispatchToProps = (dispatch) => {
    return {
    setDocs: (documents) => {
        dispatch(setDocuments(documents))
    },
    clearUser: (user) => {
    dispatch(deleteUser(user))
}}
}
export default connect(mapStateToProps, mapDispatchToProps)(Documents)

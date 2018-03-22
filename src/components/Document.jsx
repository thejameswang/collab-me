import React from 'react';
import axios from 'axios';
import ViewShared from './ViewShared.jsx'
import {currentDoc} from '../actions/index.js'
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';

class Document extends React.Component {
    constructor(props) {
        super(props);
    }

    setDoc() {
        this.props.setCurrentDoc(this.props.doc);
    }

    render() {
        return (<div className="row">
            <div className="col-lg-12">
                <p>
                    <Link onClick={this.setDoc.bind(this)} to={{ pathname: '/edit', state: { id:this.props.doc._id}}} className="btn btn-outline-secondary">{this.props.doc.name}</Link>
                </p>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user,
        current: state.current
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        setCurrentDoc: (doc) => {
            dispatch(currentDoc(doc))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Document)

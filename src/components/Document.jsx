import React from 'react';
import axios from 'axios';
import ViewShared from './ViewShared.jsx'
import {currentDoc} from '../actions/index.js'
import {connect} from 'react-redux';
import {Link, Route} from 'react-router-dom';

class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (<div>
            <Link  to={{ pathname: '/edit', state: { current: this.props.doc}}} className="btn btn-xs btn-default">{this.props.doc.name}</Link>
        </div>);
    }

}



const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

// mapStateToProps is here
const mapDispatchToProps = (dispatch) => {
    return {

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Document)

import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {


    }

    render() {
        return (<div className="container">
            <Link to='/documents' className="btn btn-xs btn-default">Back to Documents</Link>
            <div className="row">
            <div className="col-xs-12 col-md-8">Document: {this.props.current.name}</div>

            <div className="col-xs-12 col-md-4">History: {this.props.current.history.toString()}</div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-md-8">Content: {this.props.current.content}</div>
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

export default connect(mapStateToProps, null)(History);

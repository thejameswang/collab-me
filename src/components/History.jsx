import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    componentWillMount() {
        console.log(this.props);
        console.log(this.state);

    }

    render() {
        return (<div className="container">
            <Link to='/documents' className="btn btn-xs btn-default">Back to Documents</Link>
            <div className="row">
            <div className="col-xs-12 col-md-8">Document: {this.props.location.state.current.name}</div>

            <div className="col-xs-12 col-md-4">History</div>
        </div>
        <div className="row">
            <div className="col-xs-12 col-md-8">Content: {this.props.location.state.current.content}</div>
        </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

export default connect(mapStateToProps, null)(History);

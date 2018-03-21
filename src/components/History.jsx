import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';

class History extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (<div>
        Revision history component
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    };
}

const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(History)

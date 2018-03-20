import React from 'react';
import {Link} from 'react-router-dom';

export default class Navbar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {

        return (<div>
            <Link to="/signup" className="btn btn-xs btn-default">Signup</Link>
        </div>);
    }
}

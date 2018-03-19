import React from 'react';
import axios from 'axios';

export default class Document extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {

        return (<div>
            <li>{this.props.doc}</li>
        </div>);
    }
}

import React from 'react';
import axios from 'axios';
import Document from './Document.jsx'

export default class Documents extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documents: ["James Bible", "Kats Koziness", "Horizonites on the Run"]
        };

    }

    render() {

        return (<div className="container">
            <h5>List of Documents:</h5>
            <ul>
                {this.state.documents.map((doc) => <Document doc={doc}/>)}
            </ul>
        </div>);
    }
}

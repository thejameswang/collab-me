import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import Diff from 'text-diff';
import {convertFromRaw, getPlainText} from 'draft-js';
import ReactDOM from 'react-dom';

class History extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: '',
            recent: '',
            recentObj: {}
        }
    }

    componentDidMount() {
        let recent = convertFromRaw(JSON.parse(this.props.current.history[0].content)).getPlainText();
        this.setState({recent: recent, recentObj: this.props.current.history[0]});
    }

    setHistory(h) {

        // If the selected object isnt the most recent, mark it as the selected object
        // Use the diff npm package to find diffs then use the prettyHtml method to convert to HTML
        if (h !== this.state.recentObj) {
            let selected = convertFromRaw(JSON.parse(h.content)).getPlainText();
            this.setState({selected: selected});
            var diff = new Diff();
            var textDiff = diff.main(this.state.recent, this.state.selected); // produces diff array
            this.setState({string: diff.prettyHtml(textDiff)});
        }

    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8 login-box">
                    <Link to='/documents' className="btn btn-outline-secondary">Back to Documents</Link>
                    <div className="col-lg-12 login-title">
                        {this.props.current.name}
                        History
                    </div>
                    <div className="col-lg-12 login-form">
                        <div id="container">{this.state.string}</div>
                        <div className="col-lg-12 login-form">
                            <div className="col-xs-12 col-md-4">
                                History:{
                                    this.props.current.history.length > 0
                                        ? this.props.current.history.map((h) => <button onClick={() => this.setHistory(h)} className="btn btn-outline-secondary">{h.updated_at}</button>)
                                        : ''
                                }
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 col-md-8">Content: {this.props.current.content}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
    }
}

const mapStateToProps = (state) => {
    return {user: state.user, current: state.current};
}

export default connect(mapStateToProps, null)(History);

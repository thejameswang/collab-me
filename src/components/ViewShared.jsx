import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {BrowserRouter, withRouter} from 'react-router-dom'

const dbUrl = "/db";

class ViewShared extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            docId: ''
        };
    }

    handleInputChange(event) {
        const state = this.state;
        state[event.target.name] = event.target.value;
        this.setState(state);
    }

    handleSubmit(e) {
        e.preventDefault();

        let self = this;
        axios.get('http://localhost:3000/shared',{
        params: {
            id: self.state.docId
        }}).then(function(response) {
            console.log("doc to be worked on : " + response.data.name);
            self.props.history.push({pathname: '/edit', state: { current: response.data }});
        }).catch(function(error) {
            console.log(error);
        });


    }

    render() {
        return (<div className="container">
            <div className="row">
                <div className="col-lg-3 col-md-2"></div>
                <div className="col-lg-6 col-md-8">
                    <div className="col-lg-12">
                        <h5>Collaborate on Document</h5>
                    </div>
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">Enter Shared Document ID:</label>
                                    <input type="text" name="docId" className="form-control" value={this.state.docId} onChange={this.handleInputChange.bind(this)}/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-xs btn-default">Collab</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="col-lg-3 col-md-2"></div>
                </div>
            </div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ViewShared))

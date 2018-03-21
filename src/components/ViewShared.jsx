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
        console.log(this.props.user)
        let self = this;
        axios.get('http://localhost:3000/shared',{
        params: {
            id: self.state.docId,
            user: this.props.user
        }}).then(function(response) {
            console.log("doc to be worked on : " + response.data.name);
            self.props.history.push({pathname: '/edit', state: { current: response.data }});
        }).catch(function(error) {
            console.log(error);
        });
    }

    render() {
        return (
            <div className="row">
                    <div className="col-lg-12 login-title">
                        COLLAB
                    </div>
                    <div className="col-lg-12">
                        <div className="col-lg-12">
                            <form onSubmit={this.handleSubmit.bind(this)}>
                                <div className="form-group">
                                    <label className="form-control-label">SHARED DOC ID</label>
                                    <input type="text" name="docId" className="form-control" value={this.state.docId} onChange={this.handleInputChange.bind(this)}/>
                                </div>
                                <div className="col-lg-12">
                                    <div className="col-lg-6"></div>
                                    <div className="col-lg-6">
                                        <button type="submit" className="btn btn-outline-primary">Collab</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

        );
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

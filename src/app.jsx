import React from 'react';
import Main from './components/Main.jsx';
import Documents from './components/Documents.jsx';
import AddDocument from './components/AddDocument.jsx';
import ViewShared from './components/ViewShared.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import Navbar from './components/Navbar.jsx';
import {HashRouter, Route, Switch} from 'react-router-dom';

export default class App extends React.Component {

    render() {
        return (<HashRouter>
            <div>
                <Route path="/" exact component={Login}/>
                <Route path="/signup" exact component={Signup}/>
            </div>
        </HashRouter>);
    }
}

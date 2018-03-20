import React from 'react';
import Main from './components/Main.jsx';
import Documents from './components/Documents.jsx';
import AddDocument from './components/AddDocument.jsx';
import ViewShared from './components/ViewShared.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import {HashRouter, Route} from 'react-router-dom';

export default class App extends React.Component {

    render() {
        return (<HashRouter>
            <div>
                <Route path="/" exact component={Login}/>
                <Route path="/edit" exact component={Main}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/documents" exact component={Documents}/>
                <Route path="/newdocument" exact component={AddDocument}/>
            </div>
        </HashRouter>);
    }
}

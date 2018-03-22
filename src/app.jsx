// Importing needed npm packages
import React from 'react';
import Main from './components/Main.jsx';
import Documents from './components/Documents.jsx';
import AddDocument from './components/AddDocument.jsx';
import ViewShared from './components/ViewShared.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import {HashRouter, Route} from 'react-router-dom';
import History from './components/History.jsx';

//All components needed while also provoiding routing capabilities
//Called in index.html script tags
export default class App extends React.Component {
    render() {
      //While Router was provided, Hashrouter resolves distinct issues in electron
        return (<HashRouter>
            <div>
                <Route path="/" exact component={Login}/>
                <Route path="/edit" exact component={Main}/>
                <Route path="/signup" exact component={Signup}/>
                <Route path="/documents" exact component={Documents}/>
                <Route path="/newdocument" exact component={AddDocument}/>
                <Route path="/history" exact component={History}/>
            </div>
        </HashRouter>);
    }
}

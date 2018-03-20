import React from 'react';
import Main from './components/Main.jsx';
import Documents from './components/Documents.jsx';
import AddDocument from './components/AddDocument.jsx';
import ViewShared from './components/ViewShared.jsx';
import Login from './components/Login.jsx';
import Signup from './components/Signup.jsx';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/index';
import {HashRouter as Router, Route, Link} from 'react-router-dom';

let store = createStore(reducer);
window.store = store;

export default class App extends React.Component {
  render() {
      return (
        <Provider store={store}>
            <Router>
                <Route path="/" component={Login}/>
            </Router>
        </Provider>
      )
    return ( <div>
      <Main/>
      <Documents/>
      <AddDocument/>
      <ViewShared/>
</div>);
  }
}

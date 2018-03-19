import React from 'react';
import Main from './components/Main.jsx'
import Documents from './components/Documents.jsx'

export default class App extends React.Component {
  render() {
    return (<div>
      <Main/>
      <Documents/>
    </div>);
  }
}

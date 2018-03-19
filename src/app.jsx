import React from 'react';
import Main from './components/Main.jsx'
import Documents from './components/Documents.jsx'
import AddDocument from './components/AddDocument.jsx'

export default class App extends React.Component {
  render() {
    return (<div>
      <Main/>
      <Documents/>
      <AddDocument/>
</div>);
  }
}

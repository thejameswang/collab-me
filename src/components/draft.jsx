import React from 'react';
import { Editor, EditorState, RichUtils} from 'draft-js';
// import '../stylesheets/styles.css';

export default class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {editorState: EditorState.createEmpty()};
    this.onChange = (editorState) => this.setState({editorState});
    this.handleKeyCommand = this.handleKeyCommand.bind(this);
  }

  handleKeyCommand(command, editorState) {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      this.onChange(newState);
      return 'handled';
    }
    return 'not-handled';
  }

  _onBoldClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'BOLD'));
  }

  _onItalicsClick() {
    this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ITALIC'));
  }

  render() {

    return (<div className="container">
        <p>
            <button className="btn btn-xs btn-default" title="back"><i className="fa fa-angle-left"></i> Go Back</button>
        </p>
        <div className="title">
          <h3>Collab.Me</h3>
      </div>
      <div className='btn-group'>
          <button className="btn btn-xs btn-default" title="bold" onClick={this._onBoldClick.bind(this)}><i className="fa fa-bold"></i></button>
          <button className="btn btn-xs btn-default" title="italic" onClick={this._onItalicsClick.bind(this)}><i className="fa fa-italic"></i></button>
          <button className="btn btn-xs btn-default" title="underline"><i className="fa fa-underline"></i></button>
          <button className="btn btn-xs btn-default" title="strikethrough"><i className="fa fa-strikethrough"></i></button>
          <button className="btn btn-xs btn-default" title="custom">Custom</button>
      </div>
      <div className="editor">
          <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
      </div>
      <p>
          <button className="btn btn-xs btn-default" title="save">Save Changes</button>
      </p>
    </div>);
  }
}

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
    return (<div className="">
      <h2>You're Dumb!</h2>
      <button onClick={this._onBoldClick.bind(this)}>Bold</button>
      <button onClick={this._onItalicsClick.bind(this)}>Italics</button>
      <div className="DottedBox">
          <Editor editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
      </div>
    </div>);
  }
}

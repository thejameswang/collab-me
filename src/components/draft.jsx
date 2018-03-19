import React from 'react';
import {Editor, EditorState, RichUtils} from 'draft-js';
// import '../stylesheets/styles.css';

// function myBlockStyleFn(contentBlock) {
//   const type = contentBlock.getType();
//   if (type === 'blockquote') {
//     return 'superFancyBlockquote';
//   }
// }


// const getBlockStyle = (block) => {
//   switch (block.getType()) {
//       case 'left':
//           return 'align-left';
//       case 'center':
//           return 'align-center';
//       case 'right':
//           return 'align-right';
//       default:
//           return null;
//   }
// }


export default class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editorState: EditorState.createEmpty()
        };
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
    _onUnderlineClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'UNDERLINE'));
    }
    _onStrikethroughClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'STRIKETHROUGH'));
    }
    _onLeftAlignClick() {
      this.onChange(RichUtils.toggleBlockType(this.state.editorState, 'STRIKETHROUGH'));
    }
    _onRightAlignClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ALIGNRIGHT'));
    }
    _onLeftAlignClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ALIGNLEFT'));
    }
    _onCenterAlignClick() {
      this.onChange(RichUtils.toggleInlineStyle(this.state.editorState, 'ALIGNCENTER'));
    }

    // myFunction() {}

    render() {

        return (<div className="container">
            <p>
                <button className="btn btn-xs btn-default" title="back">
                    <i className="fa fa-angle-left"></i>
                    Go Back</button>
            </p>
            <div className="title">
                <h3>Collab.Me</h3>
            </div>
            <div>
                <h5>Document Name</h5>
                <p>Shareable ID: #########<button className="btn btn-xs btn-default" title="copy">
                        <i className="fa fa-copy"></i>
                        Copy to Clipboard</button>
                </p>
            </div>
            <p>
                <div className='btn-group'>
                    <div className="dropdown">Font Color:
                    <select className="btn btn-xs btn-default dropdown-toggle" name="color">
                        <option className="dropdown-item" value="red">Red</option>
                        <option className="dropdown-item" value="orange">Orange</option>
                        <option className="dropdown-item" value="yellow">Yellow</option>
                        <option className="dropdown-item" value="green">Green</option>
                        <option className="dropdown-item" value="blue">Blue</option>
                        <option className="dropdown-item" value="purple">Purple</option>
                    </select>
                </div>
                <div className="dropdown">Font Size:
                <select className="btn btn-xs btn-default dropdown-toggle" name="color">
                    <option className="dropdown-item" value="16">16</option>
                    <option className="dropdown-item" value="18">18</option>
                    <option className="dropdown-item" value="22">22</option>
                    <option className="dropdown-item" value="24">24</option>
                    <option className="dropdown-item" value="26">26</option>
                    <option className="dropdown-item" value="28">28</option>
                </select>
            </div>
            </div>
            </p>
            <div className='btn-group'>
                <button className="btn btn-xs btn-default" title="bold" onClick={this._onBoldClick.bind(this)}>
                    <i className="fa fa-bold"></i>
                </button>
                <button className="btn btn-xs btn-default" title="italic" onClick={this._onItalicsClick.bind(this)}>
                    <i className="fa fa-italic"></i>
                </button>
                <button className="btn btn-xs btn-default" title="underline" onClick={this._onUnderlineClick.bind(this)}>
                    <i className="fa fa-underline"></i>
                </button>
                <button className="btn btn-xs btn-default" title="strikethrough" onClick={this._onStrikethroughClick.bind(this)}>
                    <i className="fa fa-strikethrough"></i>
                </button>
            </div>
            <div className='btn-group'>
                <button className="btn btn-xs btn-default" title="left-align" onClick={this._onLeftAlignClick.bind(this)}>
                    <i className="fa fa-align-left"></i>
                </button>
                <button className="btn btn-xs btn-default" title="center-align" onClick={this._onCenterAlignClick.bind(this)}>
                    <i className="fa fa-align-justify"></i>
                </button>
                <button className="btn btn-xs btn-default" title="right-align" onClick={this._onRightAlignClick.bind(this)}>
                    <i className="fa fa-align-right"></i>
                </button>
            </div>
            <div className='btn-group'>
                <button className="btn btn-xs btn-default" title="bulleted-list">
                    <i className="fa fa-list-ul"></i>
                </button>
                <button className="btn btn-xs btn-default" title="numbered-list">
                    <i className="fa fa-list-ol"></i>
                </button>
            </div>
            <button className="btn btn-xs btn-default" title="custom">Custom</button>
            <div className="editor">
                <Editor customStyleMap={styleMap} editorState={this.state.editorState} handleKeyCommand={this.handleKeyCommand} onChange={this.onChange}/>
            </div>
            <p>
                <button className="btn btn-xs btn-default" title="save">Save Changes</button>
            </p>
        </div>);
    }
}

const styleMap = {
  'ALIGNRIGHT': {
    textAlign: 'right',
    display: 'inline-block',
    width: '100%'
  },
  'ALIGNLEFT': {
    textAlign: 'left',
    display: 'inline-block',
    width: '100%'
  },
  'ALIGNCENTER': {
    textAlign: 'center',
    display: 'inline-block',
    width: '100%'
  },
};

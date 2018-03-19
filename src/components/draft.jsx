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


  render() {
    return (<div className="container">
        <p>
            <button className="btn btn-xs btn-default" title="back"><i className="fa fa-angle-left"></i> Go Back</button>
        </p>
        <div className="title">
          <h3>Collab.Me</h3>
        </div>
        <div>
            <h5>Document Name</h5>
            <p>Shareable ID: #########<button className="btn btn-xs btn-default" title="copy"><i className="fa fa-copy"></i> Copy to Clipboard</button></p>
        </div>

      <div className='btn-group'>
          <button className="btn btn-xs btn-default" title="bold" onClick={this._onBoldClick.bind(this)}><i className="fa fa-bold"></i></button>
          <button className="btn btn-xs btn-default" title="italic" onClick={this._onItalicsClick.bind(this)}><i className="fa fa-italic"></i></button>
          <button className="btn btn-xs btn-default" title="underline" onClick={this._onUnderlineClick.bind(this)} ><i className="fa fa-underline"></i></button>
          <button className="btn btn-xs btn-default" title="strikethrough" onClick={this._onStrikethroughClick.bind(this)}><i className="fa fa-strikethrough"></i></button>
      </div>
      <div className='btn-group'>
          <button className="btn btn-xs btn-default" title="font-color"><i className="fa fa-paint-brush"></i></button>
          <button className="btn btn-xs btn-default" title="font-size"><i className="fa fa-font"></i></button>
      </div>
      <div className='btn-group'>
          <button className="btn btn-xs btn-default" onClick={this._onLeftAlignClick.bind(this)} title="left-align"><i className="fa fa-align-left"></i></button>
          <button className="btn btn-xs btn-default" onClick={this._onCenterAlignClick.bind(this)} title="center-align"><i className="fa fa-align-justify"></i></button>
          <button className="btn btn-xs btn-default" onClick={this._onRightAlignClick.bind(this)} title="right-align"><i className="fa fa-align-right"></i></button>
      </div>
      <div className='btn-group'>
          <button className="btn btn-xs btn-default" title="bulleted-list"><i className="fa fa-list-ul"></i></button>
          <button className="btn btn-xs btn-default" title="numbered-list"><i className="fa fa-list-ol"></i></button>
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

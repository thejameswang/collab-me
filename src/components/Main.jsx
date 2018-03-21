import React from 'react';
import {
    Editor,
    convertToRaw,
    convertFromRaw,
    EditorState,
    RichUtils,
    Modifier,
    ContentState
} from 'draft-js';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import {CopyToClipboard} from 'react-copy-to-clipboard';

export default class Main extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            editorState: EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.current.rawContent))),
            size: 12,
            color: "red",
            backend: '',
            client: '',
            response: false,
            endpoint: "http://10.2.105.66:8000",
            copied: false
        };
        this.onChange = (editorState) => this.setState({editorState});
        this.handleKeyCommand = this.handleKeyCommand.bind(this);
    }

    componentDidMount() {
        const {endpoint} = this.state;
        const socket = socketIOClient(endpoint);
        socket.emit('text', {text: "sending you this text data fron the client"});
        socket.on('text', (data) => this.handleRecievedText(data));
        socket.on('newUser', (data) => this.updateText(data));
    }

    //  Replace the editor with the current content of the editor
    // from the web-sockets whenever a new user connects to the socket
    updateText(data) {
        this.setState({client: data.text});
        console.log("Getting the following from the client: " + data.text);
    }

    // Called whenever the backend/server sends back a package called ‘text’
    // Updates the text that is found in the editor and is updating the contents of the text object
    handleRecievedText(data) {
        this.setState({backend: data.text});
        console.log("Getting the following from the backend: " + data.text);
        console.log(data);
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

    handleFontSizeChange(event) {
        this.setState({size: event.target.value});
        console.log("state is now", this.state);
    }

    handleFontColorChange(event) {
        this.setState({color: event.target.value});
        console.log("state is now", this.state);
    }

    saveDoc() {
        console.log(this.props.location.state.current);
        let currentContent = convertToRaw(this.state.editorState.getCurrentContent());
        let self = this;
        axios.get('http://localhost:3000/update', {
            params: {
                id: self.props.location.state.current._id,
                currentContent: currentContent
            }
        }).then(function(response) {
            console.log(response);
        }).catch(function(error) {
            console.log(error);
        });
    }

    onCopy() {
  this.setState({copied: true});
}
    render() {

        return (<div className="container">
            <p>
                <Link to={{
                        pathname: '/documents'
                    }} className="btn btn-xs btn-default">Go Back</Link>
            </p>
            <div className="title">
                <h3>Collab.Me</h3>
            </div>
            <div>
                <h5>Document Name</h5>
                <p>Shareable ID: {this.props.location.state.current._id}
                <CopyToClipboard text={this.props.location.state.current._id.toString()}
                  onCopy={this.onCopy.bind(this)}>
                 <button className="btn btn-xs btn-default" title="copy">
                <i className="fa fa-copy"></i>
                Copy to Clipboard</button>
               </CopyToClipboard>
               <div>{this.state.copied ? <span><i>ID Copied.</i></span> : null}</div>
                </p>
            </div>
            <div className="container">Client: {this.state.client}</div>
            <div className="container">Backend: {this.state.backend}</div>
            <p>
                <div className='btn-group'>
                    <div className="dropdown">Font Color:
                        <select value={this.state.value} onChange={this.handleFontColorChange.bind(this)} className="btn btn-xs btn-default dropdown-toggle" name="color">
                            <option className="dropdown-item" value="red">Red</option>
                            <option className="dropdown-item" value="orange">Orange</option>
                            <option className="dropdown-item" value="yellow">Yellow</option>
                            <option className="dropdown-item" value="green">Green</option>
                            <option className="dropdown-item" value="blue">Blue</option>
                            <option className="dropdown-item" value="purple">Purple</option>
                        </select>
                    </div>
                    <div className="dropdown">Font Size:
                        <select value={this.state.value} onChange={this.handleFontSizeChange.bind(this)} className="btn btn-xs btn-default dropdown-toggle" name="color">
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
                <button onClick={this.saveDoc.bind(this)} className="btn btn-xs btn-default" title="save">Save Changes</button>
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
    }
};

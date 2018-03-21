import React from 'react';
import {
    Editor,
    convertToRaw,
    convertFromRaw,
    EditorState,
    RichUtils,
    Modifier,
    ContentState,
    CompositeDecorator,
    generateDecorator
} from 'draft-js';
import {Link, Route} from 'react-router-dom';
import axios from 'axios';
import socketIOClient from "socket.io-client";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import History from './History.jsx';

export default class Main extends React.Component {
    constructor(props) {
        super(props);
        let stringToParse;

        if (typeof(this.props.location.state.current.rawContent)!== "undefined") {
            stringToParse = EditorState.createWithContent(convertFromRaw(JSON.parse(this.props.location.state.current.rawContent)));
        } else {
            stringToParse = EditorState.createEmpty();
        }

        console.log(this.props.location.state.current);
        this.state = {
            editorState: stringToParse,
            size: 12,
            color: "red",
            backend: '',
            client: '',
            response: false,
            endpoint: "http://10.2.105.66:8000",
            copied: false,
            search: ''
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

    handleSearchChange(event) {
        const state = this.state;
        let self = this;
        state[event.target.name] = event.target.value;
        this.setState(state);
        this.setState({
            editorState: EditorState.set(self.state.editorState, {
                decorator: self.generateDecorator(event.target.value)
            })
        });

    }

    // Create regex containing our search term
    generateDecorator(highlightTerm) {
        const regex = new RegExp(highlightTerm, 'g');
        return new CompositeDecorator([
            {
                strategy: (contentBlock, callback) => {
                    if (highlightTerm !== '') {
                        this.findWithRegex(regex, contentBlock, callback);
                    }
                },
                component: this.SearchHighlight
            }
        ])
    };

    // Highlight class applied
    SearchHighlight(props) {
        return (<span className="search-and-replace-highlight" style={{
                color: "red"
            }}>{props.children}</span>)
    };

    // Regex used to find the text ranges that we want to decorate
    findWithRegex(regex, contentBlock, callback) {
        const text = contentBlock.getText();
        let matchArr,
            start,
            end;
        while ((matchArr = regex.exec(text)) !== null) {
            start = matchArr.index;
            end = start + matchArr[0].length;
            callback(start, end);
        }
    };

    render() {

        return (<div className="container">
            <div className="row">

            <div className="col-lg-3 col-md-2"></div>
            <div className="col-lg-6 col-md-8 login-box">
                <Link to={{
                        pathname: '/documents'
                    }} className="btn btn-outline-secondary">Go Back</Link>

            <div className="col-lg-12 login-title">
                {this.props.location.state.current.name}
            </div>
            <div className="col-lg-12 login-form">
                <div className="col-lg-12 login-form">
                    <label className="form-control-label">SHAREABLE ID: {this.props.location.state.current._id}</label>
                    <CopyToClipboard text={this.props.location.state.current._id} onCopy={this.onCopy.bind(this)}>
                        <button className="btn btn-xs btn-default" title="copy">
                            <i className="fa fa-copy"></i>
                            Copy to Clipboard</button>
                    </CopyToClipboard>
                    <div>{this.state.copied ? <span><i>ID Copied.</i></span>: null}</div>
            </div>
            <div className="container">
                <label className="form-control-label">Client: {this.state.client}</label>
                <label className="form-control-label">Backend: {this.state.backend}</label>
            </div>
            <div className="col-lg-12">
                <div className="col-lg-12">
                    <div className="form-group">
                        <label className="form-control-label">SEARCH DOCUMENT:</label>
                        <input type="text" name="search" className="form-control" value={this.state.search} onChange={this.handleSearchChange.bind(this)}/>
                    </div>
                </div>
            </div>
                <div className='btn-group'>
                    <div className="dropdown">
                        <label className="form-control-label">FONT COLOR:</label>
                        <select value={this.state.value} onChange={this.handleFontColorChange.bind(this)} className="btn btn-xs btn-default dropdown-toggle" name="color">
                            <option className="dropdown-item" value="red">Red</option>
                            <option className="dropdown-item" value="orange">Orange</option>
                            <option className="dropdown-item" value="yellow">Yellow</option>
                            <option className="dropdown-item" value="green">Green</option>
                            <option className="dropdown-item" value="blue">Blue</option>
                            <option className="dropdown-item" value="purple">Purple</option>
                        </select>
                    </div>
                    <div className="dropdown">
                        <label className="form-control-label">FONT SIZE:</label>
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
                <button onClick={this.saveDoc.bind(this)} className="btn btn-outline-primary" title="save">Save Changes</button>
            </p>
            <p>
                <Link to={{ pathname: '/history', state: { current: this.props.location.state.current}}} className="btn btn-outline-secondary">View History</Link>
            </p>
</div></div></div>
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

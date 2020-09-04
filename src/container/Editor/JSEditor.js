import React from 'react';
import AceEditor from 'react-ace';
import ace from 'brace';

import 'brace/mode/javascript';
import 'brace/theme/chrome';
import 'brace/theme/dracula';
import 'brace/snippets/javascript';
import 'ace-builds/src-noconflict/ext-language_tools';
import 'ace-builds/src-noconflict/ext-searchbox';
import 'ace-builds/src-noconflict/ext-static_highlight';

import EditorOptions from './EditorOptions/EditorOptions';

const styles = {
    editorOption: {
        position: 'absolute',
        top: '-30px',
        left: 0,
        width: '100%',
    },
    jsStyle: {
		position: 'relative',
        width: 'auto',
        marginTop: '30px',
		maxHeight: '580px'
    }
}

export default class JavascriptEditor extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			height: this.props.height,
			width: 0,
			newValue: ''
		}
		this.themeValue= "chrome";
	}

	jsref = React.createRef();

	onChange(newValue) {
		// store this value in state!!
		this.setState({ newValue: newValue });
	}
    
    shouldComponentUpdate(nextProps, nextState) {
        return true;
	}
	
	componentDidUpdate(prevProps, prevState) {
		if (prevProps.width.current.clientWidth !== prevState.width) {
			this.setState(() => ({
				width: prevProps.width.current.clientWidth
			}));
		}
		if (prevProps.height !== prevState.height) {
			this.setState({
				height: prevProps.height
			});
		}
	}

	render() {
		return (
			<div style={{position: 'relative'}}>
                <div style={styles.editorOption}>
                    <EditorOptions mode="Javascript" />
                </div>
				<AceEditor
					ace={ace}
					style={styles.jsStyle}
					ref={this.jsref}
					mode="javascript"
					theme={this.themeValue}
					onChange={this.onChange}
					value={this.state.newValue}
					name="uniqueJavascriptId"
					editorProps={{
						$blockScrolling: true,
					}}
					height={this.state.height}
					width={this.state.width}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={false}
					enableSnippets={true}
					setOptions={{ useWorker: false }}
				/>
			</div>
		);
	}
}

import React from 'react';
import AceEditor from 'react-ace';
import ace from 'brace';

import 'brace/mode/scss';
import 'brace/theme/chrome';
import 'ace-builds/src-noconflict/ext-language_tools'

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
		maxHeight: '580px',
    }
}

export default class StyleEditor extends React.Component {
	constructor(props) {
		super(props);
		this.onChange = this.onChange.bind(this);
		this.state = {
			height: this.props.height,
			width: 0,
			newValue: '',
		}
	}

	scssref = React.createRef();

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
                    <EditorOptions mode="SCSS" />
                </div>
				<AceEditor
					ace={ace}
					ref={this.scssref}
					style={styles.jsStyle}
					mode="scss"
					theme="chrome"
					onChange={this.onChange}
					value={this.state.newValue}
					name="uniqueSCSSId"
					editorProps={{
						$blockScrolling: true,
					}}
					height={this.state.height}
					width={this.state.width}
					enableBasicAutocompletion={true}
					enableLiveAutocompletion={true}
					enableSnippets={true}
					setOptions={{ useWorker: false }}
				/>
			</div>
		);
	}
}

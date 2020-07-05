import React, { Component } from 'react';

import JSONEditorReact from './EditorJson';

const json = {
	array: [1, 2, 3],
	boolean: true,
	null: null,
	number: 'four',
	object: { a: 'b', c: 'd' },
	string: 'Hello World',
};

export default class JSONEditor extends Component {
	state = {
		text: JSON.stringify(json, null, 2),
		mode: 'code',
	};

	render() {
		return (
			<JSONEditorReact
				text={this.state.text}
                modes={['tree', 'code']}
                mode={this.state.mode}
                search={false}
                indentation={4}
				// onChangeText={this.onChangeText}
				// onModeChange={this.onModeChange}
			/>
		);
	}
}

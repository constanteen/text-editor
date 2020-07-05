import React, { useRef, useState } from 'react';

import classes from './EditorContainer.module.css';

import HBSEditor from '../../../Editor/HBSEditor';
import JSEditor from '../../../Editor/JSEditor';
import StyleEditor from '../../../Editor/StyleEditor';

import { convertToPercent } from '../../../Utility/functions/functions';

let lastDblClicked;

export default function EditorContainer(props) {
	// eslint-disable-next-line no-unused-vars
	const [isResizing, setResizing] = useState(false);

	const handleResizing = (resize) => {
		return setResizing(isResizing => isResizing = resize)
	}

	const hbsResizer = useRef(),
		cssResizer = useRef(),
		jsResizer = useRef(),
		jsEditor = useRef(),
		hbsEditor = useRef(),
		cssEditor = useRef(),
		boxes = useRef();

	let initCssClientX,
		initJsClientX,
		hbsEditorRectBox,
		cssEditorRectBox,
		jsEditorRectBox,
		// lastDblClicked,
		jsResizerRectBox,
		cssResizerRectBox,
		// eslint-disable-next-line no-unused-vars
		hbsResizerRectBox, jsBoxLastWidth,
		oldPosition;

	const windowWidth = window.innerWidth;

	function validateSizes() {
		getPresentDimensions();
		return cssEditorRectBox.width === jsEditorRectBox.width === hbsEditorRectBox.width;
	}

	function getPresentDimensions() {
		cssEditorRectBox = cssEditor.current.getBoundingClientRect();
		jsEditorRectBox = jsEditor.current.getBoundingClientRect();
		hbsEditorRectBox = hbsEditor.current.getBoundingClientRect();
		updateResizers();
	}

	function updateResizers() {
		jsResizerRectBox = jsResizer.current.getBoundingClientRect();
		cssResizerRectBox = cssResizer.current.getBoundingClientRect();
		hbsResizerRectBox = hbsResizer.current.getBoundingClientRect();
	}

	function adjustBoxes(h, j, c) {
		hbsEditor.current.style.width = `${h}%`;
		jsEditor.current.style.width = `${j}%`;
		cssEditor.current.style.width = `${c}%`;
		addTransition();
	}

	function addTransition() {
		hbsEditor.current.style.transition = '.3s ease';
		jsEditor.current.style.transition = '.3s ease';
		cssEditor.current.style.transition = '.3s ease';
	}

	function removeTransition() {
		hbsEditor.current.style.transition = 'none';
		jsEditor.current.style.transition = 'none';
		cssEditor.current.style.transition = 'none';
	}

	function convertPercentToNum(whoseWidth) {
		const widthStr = whoseWidth;
		const widthNum = widthStr.substring(0, widthStr.length - 1);
		return Number(widthNum);
	}

	const expandHbs = () => {
		if (validateSizes() || lastDblClicked !== 'hbs') {
			adjustBoxes(98.5, 0, 0);
			lastDblClicked = 'hbs';
			return;
		}
		adjustBoxes(32.833, 32.833, 32.833);
		lastDblClicked = '';
	};

	const expandJs = () => {
		if (validateSizes() || lastDblClicked !== 'js') {
			adjustBoxes(0, 98.5, 0);
			lastDblClicked = 'js';
			return;
		}
		adjustBoxes(32.833, 32.833, 32.833);
		lastDblClicked = '';
	};

	const expandCss = () => {
		if (validateSizes() || lastDblClicked !== 'css') {
			adjustBoxes(0, 0, 98.5);
			lastDblClicked = 'css';
			return;
		}
		adjustBoxes(32.833, 32.833, 32.833);
		lastDblClicked = '';
	};

	const holdCssHandler = (e) => {
		e.preventDefault();
		getPresentDimensions();
		removeTransition();
		initCssClientX = e.clientX;
		boxes.current.addEventListener('mousemove', movingCSS);
		boxes.current.addEventListener('mouseup', removeCssEvents);
	};

	function movingCSS(e) {
		e.preventDefault();
		handleResizing(true);
		const cssRectBoxCon = convertToPercent(cssEditorRectBox.width, windowWidth);
		const jsRectBoxCon = convertToPercent(jsEditorRectBox.width, windowWidth);
		const clientXCond = convertToPercent(e.clientX, windowWidth);
		const diff = clientXCond - convertToPercent(initCssClientX, windowWidth);
		let sumJs = jsRectBoxCon + diff;
		let sumcss = cssRectBoxCon - diff;
		// eslint-disable-next-line no-unused-expressions
		sumJs < 0 ? (sumJs = 0) : sumJs;
		// eslint-disable-next-line no-unused-expressions
		sumcss < 0 ? (sumcss = 0) : sumcss;
		cssEditor.current.style.width = `${sumcss}%`;
		jsEditor.current.style.width = `${sumJs}%`;

		if (
			Math.round(jsResizerRectBox.right) === Math.round(cssResizerRectBox.left) &&
			e.pageX < oldPosition
		) {
			let hbsSum = 99 - convertPercentToNum(cssEditor.current.style.width);
			// eslint-disable-next-line no-unused-expressions
			hbsSum < 0 ? (hbsSum = 0) : hbsSum;
			hbsEditor.current.style.width = `${hbsSum}%`;
		}
		if (e.pageX > oldPosition) {
			// Going Backwards, reinitialize.
			getPresentDimensions();
			initCssClientX = e.clientX;
		}
		oldPosition = e.pageX; // Keep track of mouse direction
		updateResizers();
	}

	const holdJSHandler = (e) => {
		e.preventDefault();
		getPresentDimensions();
		removeTransition();
		initJsClientX = e.clientX;
		boxes.current.addEventListener('mousemove', movingJS);
		boxes.current.addEventListener('mouseup', removeJsEvents);
	};

	function movingJS(e) {
		e.preventDefault();
		handleResizing(true);
		const hbsRectBoxCon = convertToPercent(hbsEditorRectBox.width, windowWidth);
		const clientXCond = convertToPercent(e.clientX, windowWidth);
		const jsRectBoxCon = convertToPercent(jsEditorRectBox.width, windowWidth);
		let diff = clientXCond - convertToPercent(initJsClientX, windowWidth);
		if (e.clientX < 10 && e.pageX < oldPosition) {
			hbsEditor.current.style.cursor = 'col-resize';
		} else {
			let sum = jsRectBoxCon - diff;
			// eslint-disable-next-line no-unused-expressions
			sum < 0 ? (sum = 0) : sum;
			hbsEditor.current.style.width = `${hbsRectBoxCon + diff}%`;
			jsEditor.current.style.width = `${sum}%`;
			jsBoxLastWidth = jsEditor.current.style.width;
		}

		if (
			Math.round(jsResizerRectBox.right) === Math.round(cssResizerRectBox.left) &&
			e.pageX > oldPosition
		) {
			cssEditor.current.style.width = `${99 -
				convertPercentToNum(hbsEditor.current.style.width)}%`;
			if (e.clientX > windowWidth - 2) {
				cssEditor.current.style.width = '0%';
			}
		}
		if (e.pageX < oldPosition) {
			// Going Backwards, reinitialize.
			getPresentDimensions();
			initJsClientX = e.clientX;
		}
		oldPosition = e.pageX; // Keep track of mouse direction
		updateResizers();
	}

	function removeCssEvents() {
		handleResizing(false);
		boxes.current.removeEventListener('mousemove', movingCSS);
	}

	function removeJsEvents() {
		handleResizing(false);
		boxes.current.removeEventListener('mousemove', movingJS);
	}

	return (
		<div className={classes.boxes} ref={boxes}>
			<div
				className={[classes.resizer, classes['hbs-editor-resizer']].join(' ')}
				data-name="hbs-bar"
				ref={hbsResizer}
				onDoubleClick={expandHbs}
				title="Double-click to enlarge"
			></div>
			<div className={[classes.box, classes['hbs-box']].join(' ')} ref={hbsEditor}>
				<HBSEditor height={props.height} width={hbsEditor} />
			</div>
            <div
				className={[classes.resizer, classes['js-editor-resizer']].join(' ')}
				data-name="js-bar"
				ref={jsResizer}
				onDoubleClick={expandJs}
				onMouseDown={holdJSHandler}
				title="Double-click to enlarge"
			></div>
			<div className={[classes.box, classes['js-box']].join(' ')} ref={jsEditor}>
				<JSEditor height={props.height} width={jsEditor} />
			</div>
			<div
				className={[classes.resizer, classes['css-editor-resizer']].join(' ')}
				data-name="css-bar"
				ref={cssResizer}
				onDoubleClick={expandCss}
				onMouseDown={holdCssHandler}
				title="Double-click to enlarge"
			></div>
			<div className={[classes.box, classes['css-box']].join(' ')} ref={cssEditor}>
				<StyleEditor height={props.height} width={cssEditor} />
			</div>
		</div>
	);
}

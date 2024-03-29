import React 			from 'react';
import canvasState 		from '../store/canvasState';
import toolState 		from '../store/toolState';
import Brush 			from '../tools/Brush';
import Rect 			from '../tools/Rect';
import Circle 			from '../tools/Circle';
import Eraser 			from '../tools/Eraser';
import Line 			from '../tools/Line';
import '../styles/toolbar.scss';


const Toolbar = () => {

	const changeColor = (value) => {
		toolState.setStrokeColor(value);
		toolState.setFillColor(value);
	};

	const download = () => {
		const dataUrl = canvasState.canvas.toDataURL();
        console.log(dataUrl)
		const a = document.createElement('a');
		a.href = dataUrl;
		a.download = canvasState.sessionId + ".jpg";
		document.body.appendChild(a);
		a.click();
		document.body.removeChild(a);
	};

	return (
		<div className="toolbar">
			<button 
				className='toolbarBtn brush'
				onClick={() => toolState.setTool(
					new Brush(
						canvasState.canvas,
						canvasState.socket,
						canvasState.sessionId,
					)
				)}
			/>
			<button 
				className='toolbarBtn rect'
				onClick={() => toolState.setTool(
					new Rect(
						canvasState.canvas,
						canvasState.socket,
						canvasState.sessionId,
					)
				)}
			/>
			<button 
				className='toolbarBtn circle'
				onClick={() => toolState.setTool(
					new Circle(canvasState.canvas)
				)}
			/>
			<button 
				className='toolbarBtn eraser'
				onClick={() => toolState.setTool(
					new Eraser(canvasState.canvas)
				)}
			/>
			<button 
				className='toolbarBtn line'
				onClick={() => toolState.setTool(
					new Line(canvasState.canvas)
				)}
			/>
			<input
				type="color" 
				className='palette' 
				onChange={(e) => changeColor(e.target.value)}
			/>
			<button 
				className='toolbarBtn undo' 
				onClick={canvasState.undo}
			/>
			<button 
				className='toolbarBtn redo' 
				onClick={canvasState.redo}
			/>
			<button 
				className='toolbarBtn save' 
				onClick={download}
			/>
		</div>
	);
};

export default Toolbar;
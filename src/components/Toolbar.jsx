import React from 'react';
import '../styles/toolbar.scss';


const Toolbar = () => {
	return (
		<div className="toolbar">
			<button className='toolbarBtn brush' />
			<button className='toolbarBtn rect' />
			<button className='toolbarBtn circle' />
			<button className='toolbarBtn eraser' />
			<button className='toolbarBtn line' />
			<input 	type="color" className='palette' />
			<button className='toolbarBtn undo' />
			<button className='toolbarBtn redo' />
			<button className='toolbarBtn save' />
		</div>
	);
};

export default Toolbar;
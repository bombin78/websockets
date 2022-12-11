import React 			from 'react';
import toolState 		from '../store/toolState';
import '../styles/settingbar.scss';


const SettingBar = () => {

	return (
		<div className="settingBar">
			<label
				className="labelWidth"
				htmlFor="lineWidth"
			>
				Толщина линии
			</label>
			<input
				id="lineWidth"
				className="lineWidth"
				type="number"
				defaultValue={1}
				min={1}
				max={50}
				onChange={(e) => toolState.setLineWidth(e.target.value)}
			/>

			<label
				className="labelColor"
				htmlFor="strokeColor"
			>
				Цвет обводки
			</label>
			<input
				id="strokeColor"
				className="strokeColor"
				type="color"
				onChange={(e) => toolState.setStrokeColor(e.target.value)}
			/>
		</div>
	);
};

export default SettingBar;
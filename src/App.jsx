import React 		from 'react';
import SettingBar 	from './components/SettingBar';
import Toolbar 		from './components/Toolbar';
import Canvas 		from './components/Canvas';
import './styles/app.scss';


const App = () => {
	return (
		<div className='app'>
			<Toolbar />
			<SettingBar />
			<Canvas />
		</div>
	);
};

export default App;
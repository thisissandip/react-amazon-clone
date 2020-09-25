import React from 'react';
import ReactDOM from 'react-dom';
import './style.css';
import App from './App';
import { myinitialstate, myreducer } from './context/reducer';
import { StateProvider } from './context/StateProvider';

ReactDOM.render(
	<React.StrictMode>
		<StateProvider initialState={myinitialstate} reducer={myreducer}>
			<App />
		</StateProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

import React from 'react';
import { Provider as StoreProvider } from 'react-redux';
import { Router } from 'react-router-dom';
import { store } from './redux/store';
import { createBrowserHistory } from 'history';
import { ToastContainer } from 'react-toastify';
import routes from './routes';
import { renderRoutes } from 'react-router-config';

function App() {
	const history = createBrowserHistory();
	return (
		<StoreProvider store={store}>
			<Router history={history}>
				<ToastContainer />
				{renderRoutes(routes)}
			</Router>
		</StoreProvider>
	);
}

export default App;

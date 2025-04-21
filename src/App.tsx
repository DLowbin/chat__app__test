import { Provider } from 'react-redux';
import './App.css';
import TodoList from './pages/TodoList/TodosList';
import store from './app/store';

function App() {
	return (
		<Provider store={store}>
			<TodoList />
		</Provider>
	);
}

export default App;

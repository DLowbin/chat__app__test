import { configureStore } from '@reduxjs/toolkit';
import todosReducer from '../features/todos/model/todosSlice';
import { filterReducer } from '~/features/todos/model/filterSlice';

const store = configureStore({
	reducer: {
		todos: todosReducer,
		filter: filterReducer,
	},
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';
import { TodosMap, TodoState } from './todoTypes';
import { v4 as uuid } from 'uuid';
import { RootState } from '~/app/store';
import { getTodosFromLocalStorage } from '~/shared/lib/localStorageService';
import { selectCurrentFilter } from './filterSlice';

const defaultTodosState = {};
const initialState: TodoState = { data: getTodosFromLocalStorage('todos_list') || defaultTodosState };

const todoSlice = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodo: (state, action: PayloadAction<string>) => {
			const id = uuid();
			state.data[id] = {
				id,
				value: action.payload,
				checked: false,
			};
		},
		deleteTodo: (state, action: PayloadAction<string>) => {
			delete state.data[action.payload];
		},
		fulfillTodo: (state, action: PayloadAction<string>) => {
			const id = action.payload;
			const todoCurrent = state.data[id];
			if (todoCurrent) {
				todoCurrent.checked = !todoCurrent.checked;
			}
		},
		editTodo: (state, action: PayloadAction<{ id: string; updatedValue: string }>) => {
			const { id, updatedValue } = action.payload;
			const todoCurrent = state.data[id];
			if (todoCurrent) {
				todoCurrent.value = updatedValue;
			}
		},
		dragTodo: (state, action) => {
			const { startId, finishId } = action.payload;
			const todosArray = Object.values(state.data);
			const startIndex = todosArray.findIndex((todo) => todo.id === startId);
			const finishIndex = todosArray.findIndex((todo) => todo.id === finishId);

			const [movedTodo] = todosArray.splice(startIndex, 1);
			todosArray.splice(finishIndex, 0, movedTodo);

			const newTodosObject: TodosMap = {};
			for (const todo of todosArray) {
				newTodosObject[todo.id] = todo;
			}

			state.data = newTodosObject;
		},
	},
});

export const selectTodosObject = (state: RootState): TodosMap => state.todos.data;
export const selectTodos = createSelector([selectTodosObject], (data) => Object.values(data));
export const selectFilteredTodos = createSelector([selectTodos, selectCurrentFilter], (data, filter) => {
	if (filter === 'active') return data.filter((todo) => !todo.checked);
	if (filter === 'completed') return data.filter((todo) => todo.checked);
	return data;
});

export const { addTodo, deleteTodo, fulfillTodo, editTodo, dragTodo } = todoSlice.actions;
export default todoSlice.reducer;

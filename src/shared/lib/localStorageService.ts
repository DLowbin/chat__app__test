import { Todo } from '~/features/todos';

export const setTodosToLocalStorage = (key: string, todos: { [id: string]: Todo }) => {
	localStorage.setItem(key, JSON.stringify(todos));
};

export const getTodosFromLocalStorage = (key: string) => {
	const data = localStorage.getItem(key);
	return data ? JSON.parse(data) : null;
};

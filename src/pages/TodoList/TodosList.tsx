import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import { useAppDispatch, useAppSelector } from '~/hooks/reduxHooks';
import {
	deleteTodo,
	dragTodo,
	editTodo,
	fulfillTodo,
	selectFilteredTodos,
	selectTodosObject,
} from '~/features/todos/model/todosSlice';
import { selectTodos } from '~/features/todos/model/todosSlice';
import { setTodosToLocalStorage } from '~/shared/lib/localStorageService';
import { AddTodoForm } from '~/features/todos/ui/add-todo-form';
import { Filter } from '~/features/filter';
import { TodoItem } from '~/features/todos/ui';

const cl = classNames.bind(styles);

const TodoList = () => {
	const todos = useAppSelector(selectTodos);
	const todosObject = useAppSelector(selectTodosObject);
	const filteredTodos = useAppSelector(selectFilteredTodos);
	const dispatch = useAppDispatch();

	const [draggingId, setDraggingId] = useState<string | null>(null);

	useEffect(() => {
		setTodosToLocalStorage('todos_list', todosObject);
	}, [todos]);

	const handleDragStart = (id: string) => {
		setDraggingId(id);
	};

	const handdleDragFinish = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
	};

	const handleDrop = (targetId: string) => {
		if (draggingId && draggingId !== targetId) {
			dispatch(dragTodo({ startId: draggingId, finishId: targetId }));
		}
		setDraggingId(null);
	};

	return (
		<div className={cl('todowrapper')}>
			<h1>TODOS</h1>
			<AddTodoForm />
			{todos.length > 0 && <Filter />}
			{filteredTodos.length === 0 && <p>ЗАДАЧИ ОТСУТСТВУЮТ</p>}
			{filteredTodos.map((item) => (
				<TodoItem
					item={item}
					key={item.id}
					onDelete={(id) => dispatch(deleteTodo(id))}
					onFulfill={(id) => dispatch(fulfillTodo(id))}
					onEdit={(id, value) => dispatch(editTodo({ id, updatedValue: value }))}
					onToggle={(id: string) => dispatch(fulfillTodo(id))}
					onDragStart={handleDragStart}
					onDragOver={handdleDragFinish}
					onDrop={handleDrop}
				/>
			))}
		</div>
	);
};

export default TodoList;

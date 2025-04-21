import { ChangeEvent, useState } from 'react';
import { useAppDispatch } from '~/hooks/reduxHooks';
import { addTodo } from '../../model/todosSlice';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';

const cl = classNames.bind(styles);

export const AddTodoForm = () => {
	const dispatch = useAppDispatch();
	const [todoName, setTodoName] = useState('');

	const handleAdd = () => {
		if (todoName) {
			dispatch(addTodo(todoName));
			setTodoName('');
		}
	};
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodoName(e.target.value);
	};

	return (
		<div
			className={cl('addtodo')}
			tabIndex={-1}
			onBlur={(e) => {
				if (!e.currentTarget.contains(e.relatedTarget)) {
					setTodoName('');
				}
			}}
		>
			<input
				id='todo'
				className={cl('addtodo__input')}
				type='text'
				onChange={handleChange}
				value={todoName}
			/>
			<label
				htmlFor='todo'
				className={cl('addtodo__label')}
			>
				Добавить задачу
			</label>
			<button onClick={handleAdd}>ДОБАВИТЬ</button>
		</div>
	);
};

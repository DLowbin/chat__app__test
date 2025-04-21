import { useState, useRef, useEffect, ChangeEvent } from 'react';
import classNames from 'classnames/bind';
import styles from './styles.module.scss';
import CustomButton from '~/shared/ui/components/Button';
import { trashIcon, editIcon, checkIcon, activeIcon } from '~/shared/assets';
import { TodoItemProps } from '../../model/todoTypes';

const cl = classNames.bind(styles);

export const TodoItem = ({ item, onDelete, onEdit, onToggle, onDragStart, onDrop, onDragOver }: TodoItemProps) => {
	const [todoValue, setTodoValue] = useState(item.value);
	const [editing, setEditing] = useState(false);
	const inputRef = useRef<HTMLInputElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (editing && inputRef.current && !inputRef.current.contains(event.target as Node)) {
				setEditing(!editing);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [editing]);

	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setTodoValue(e.target.value);
	};

	return (
		<div
			className={cl('todoitem', { 'todoitem--completed': item.checked })}
			ref={inputRef}
			draggable
			onDragStart={() => onDragStart(item.id)}
			onDragOver={onDragOver}
			onDrop={() => onDrop(item.id)}
		>
			{editing ? (
				<input
					value={todoValue}
					className={cl('todoitem__input')}
					type='text'
					onChange={handleChange}
					autoFocus
				/>
			) : (
				<span
					className={cl('todoitem__value', { 'todoitem__value--completed': item.checked })}
					onClick={() => setEditing(!editing)}
				>
					{item.value}
				</span>
			)}

			<div>
				{editing && (
					<CustomButton
						image={editIcon}
						onClick={() => {
							onEdit(item.id, todoValue);
							setEditing(!editing);
						}}
					/>
				)}
				<CustomButton
					image={item.checked ? checkIcon : activeIcon}
					onClick={() => onToggle(item.id)}
				/>
				<CustomButton
					onClick={() => onDelete(item.id)}
					image={trashIcon}
				/>
			</div>
		</div>
	);
};

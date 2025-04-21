export type FilterType = 'all' | 'active' | 'completed' | null;

export interface Todo {
	id: string;
	value: string;
	checked: boolean;
}

export type TodosMap = Record<string, Todo>;

export interface TodoState {
	data: TodosMap;
}

export interface TodoItemProps {
	item: Todo;
	onDelete: (id: string) => void;
	onEdit: (id: string, updatedValue: string) => void;
	onToggle: (id: string) => void;
	onFulfill: (id: string) => void;
	onDragStart: (id: string) => void;
	onDrop: (id: string) => void;
	onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
}

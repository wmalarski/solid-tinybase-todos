import { TODOS_TABLE_ID, type TodosStore } from "./create";
import { getCreatedAt } from "./utils";

export const selectTodos = (store: TodosStore) => {
	return store.getRowIds(TODOS_TABLE_ID);
};

export const selectTodo = (rowId: string) => (store: TodosStore) => {
	return store.getRow(TODOS_TABLE_ID, rowId);
};

export const selectTodoDone = (rowId: string) => (store: TodosStore) => {
	return { done: store.getCell(TODOS_TABLE_ID, rowId, "done") };
};

export const selectTodoText = (rowId: string) => (store: TodosStore) => {
	return { text: store.getCell(TODOS_TABLE_ID, rowId, "text") };
};

export const createTodo = async (store: TodosStore, text: string) => {
	store.addRow(TODOS_TABLE_ID, { createdAt: getCreatedAt(), text });
};

export type UpdateTodoTextArgs = {
	text: string;
	todoId: string;
};

export const updateTodoText = async (
	store: TodosStore,
	{ text, todoId }: UpdateTodoTextArgs,
) => {
	store.setPartialRow(TODOS_TABLE_ID, todoId, { text });
};

export type ToggleTodoArgs = {
	done: boolean;
	todoId: string;
};

export const toggleTodoDone = async (
	store: TodosStore,
	{ todoId, done }: ToggleTodoArgs,
) => {
	store.setPartialRow(TODOS_TABLE_ID, todoId, { done });
};

export const toggleAllTodoDone = async (store: TodosStore, done: boolean) => {
	store.getRowIds(TODOS_TABLE_ID).forEach((todoId) => {
		store.setCell(TODOS_TABLE_ID, todoId, "done", done);
	});
};

export const deleteTodo = async (store: TodosStore, todoId: string) => {
	store.delRow(TODOS_TABLE_ID, todoId);
};

export const deleteDoneTodos = async (store: TodosStore) => {
	store.getRowIds(TODOS_TABLE_ID).forEach((todoId) => {
		const done = store.getCell(TODOS_TABLE_ID, todoId, "done");
		if (done) {
			store.delRow(TODOS_TABLE_ID, todoId);
		}
	});
};

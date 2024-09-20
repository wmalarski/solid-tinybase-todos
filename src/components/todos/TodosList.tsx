import { type Component, createMemo, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { selectTodos } from "~/store/actions";
import { useTodosStore } from "~/store/context";
import { TODOS_TABLE_ID } from "~/store/create";

export const TodosList: Component = () => {
	const todosStore = useTodosStore();

	const todos = createMemo(() => {
		const store = todosStore();
		const initialValue = selectTodos(store);
		const [todos, setTodos] = createStore(initialValue);

		const listenerId = store.addRowIdsListener(TODOS_TABLE_ID, (store) => {
			const updatedValue = selectTodos(store);
			setTodos(reconcile(updatedValue));
		});

		onCleanup(() => {
			store.delListener(listenerId);
		});

		return todos;
	});

	return <pre>{JSON.stringify(todos(), null, 2)}</pre>;
};

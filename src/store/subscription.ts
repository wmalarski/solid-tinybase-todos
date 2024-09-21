import { createMemo, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { useTodosStore } from "./context";
import { TODOS_TABLE_ID, type TodosStore } from "./create";

type CreateStoreSubscriptionArgs<T extends object> = {
	selector: (store: TodosStore) => T;
};

export const createStoreSubscription = <T extends object>(
	args: CreateStoreSubscriptionArgs<T>,
) => {
	const todosStore = useTodosStore();

	const todos = createMemo(() => {
		const store = todosStore();
		const initialValue = args.selector(store);
		const [todos, setTodos] = createStore<T>(initialValue);

		const listenerId = store.addRowIdsListener(TODOS_TABLE_ID, (store) => {
			const updatedValue = args.selector(store);
			setTodos(reconcile(updatedValue));
		});

		onCleanup(() => {
			store.delListener(listenerId);
		});

		return todos;
	});

	return todos;
};

import {
	type Component,
	type ParentProps,
	createContext,
	createMemo,
	useContext,
} from "solid-js";
import { type TodosStore, createTodosStore } from "./create";
import type { Todo } from "./types";

const TodosStoreContext = createContext<() => TodosStore>(() => {
	throw new Error("TodosStoreContext not defined");
});

type TodosStoreProviderProps = ParentProps<{
	initialTodos: Todo[];
}>;

export const TodosStoreProvider: Component<TodosStoreProviderProps> = (
	props,
) => {
	const store = createMemo(() => createTodosStore(props.initialTodos));

	return (
		<TodosStoreContext.Provider value={() => store()}>
			{props.children}
		</TodosStoreContext.Provider>
	);
};

export const useTodosStore = () => {
	return useContext(TodosStoreContext);
};

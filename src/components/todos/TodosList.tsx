import type { Component } from "solid-js";
import { selectTodos } from "~/store/actions";
import { useTodosStore } from "~/store/context";

export const TodosList: Component = () => {
	const todosStore = useTodosStore();

	return <pre>{JSON.stringify(selectTodos(todosStore()), null, 2)}</pre>;
};

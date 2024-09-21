import type { Component } from "solid-js";
import { selectTodos } from "~/store/actions";
import { createStoreSubscription } from "~/store/subscription";

export const TodosList: Component = () => {
	const todos = createStoreSubscription({
		selector: selectTodos,
	});

	return <pre>{JSON.stringify(todos(), null, 2)}</pre>;
};

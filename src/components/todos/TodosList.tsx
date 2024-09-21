import type { Component } from "solid-js";
import { selectTodos } from "~/store/actions";
import {
	STORE_SUBSCRIPTION_NOOP,
	createStoreSubscription,
} from "~/store/subscription";

export const TodosList: Component = () => {
	const todos = createStoreSubscription({
		selector: selectTodos,
		key: "addRowIdsListener",
		args: ["todos", STORE_SUBSCRIPTION_NOOP],
	});

	return <pre>{JSON.stringify(todos(), null, 2)}</pre>;
};

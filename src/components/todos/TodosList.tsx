import { type Component, For } from "solid-js";
import { selectTodo, selectTodos } from "~/store/actions";
import {
	STORE_SUBSCRIPTION_NOOP,
	createStoreSubscription,
} from "~/store/subscription";

export const TodosList: Component = () => {
	const todos = createStoreSubscription(() => ({
		selector: selectTodos,
		key: "addRowIdsListener",
		params: ["todos", STORE_SUBSCRIPTION_NOOP],
	}));

	return (
		<ul>
			<For each={todos()}>{(todoId) => <TodoItem todoId={todoId} />}</For>
		</ul>
	);
};

type TodoItemProps = {
	todoId: string;
};

export const TodoItem: Component<TodoItemProps> = (props) => {
	const todo = createStoreSubscription(() => ({
		selector: selectTodo(props.todoId),
		key: "addRowListener",
		params: ["todos", props.todoId, STORE_SUBSCRIPTION_NOOP],
	}));

	return (
		<li>
			<pre>{JSON.stringify(todo(), null, 2)}</pre>
		</li>
	);
};

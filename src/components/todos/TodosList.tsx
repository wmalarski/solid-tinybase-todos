import { type Component, type ComponentProps, For } from "solid-js";
import {
	selectTodo,
	selectTodoDone,
	selectTodos,
	toggleTodoDone,
} from "~/store/actions";
import { useTodosStore } from "~/store/context";
import {
	STORE_SUBSCRIPTION_NOOP,
	createStoreSubscription,
} from "~/store/subscription";
import { Checkbox } from "../ui/checkbox";

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
			<TodoItemCheckboxes todoId={props.todoId} />
			<pre>{JSON.stringify(todo(), null, 2)}</pre>
		</li>
	);
};

type TodoItemCheckboxesProps = {
	todoId: string;
};

export const TodoItemCheckboxes: Component<TodoItemCheckboxesProps> = (
	props,
) => {
	const todosStore = useTodosStore();

	const isDone = createStoreSubscription(() => ({
		selector: selectTodoDone(props.todoId),
		key: "addCellListener",
		params: ["todos", props.todoId, "done", STORE_SUBSCRIPTION_NOOP],
	}));

	const onCheckedChange: ComponentProps<typeof Checkbox>["onCheckedChange"] = (
		details,
	) => {
		toggleTodoDone(todosStore(), {
			todoId: props.todoId,
			done: Boolean(details.checked),
		});
	};

	return (
		<Checkbox checked={isDone().done} onCheckedChange={onCheckedChange}>
			Done
		</Checkbox>
	);
};

import { type Component, type ComponentProps, For } from "solid-js";
import {
	selectTodoDone,
	selectTodoText,
	selectTodos,
	toggleTodoDone,
	updateTodoText,
} from "~/store/actions";
import { useTodosStore } from "~/store/context";
import {
	STORE_SUBSCRIPTION_NOOP,
	createStoreSubscription,
} from "~/store/subscription";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Editable } from "../ui/editable";

export const TodosList: Component = () => {
	const todos = createStoreSubscription(() => ({
		selector: selectTodos,
		key: "addRowIdsListener",
		params: ["todos", STORE_SUBSCRIPTION_NOOP],
	}));

	return (
		<ul>
			<For each={todos()}>
				{(todoId) => (
					<li>
						<TodoItemCheckboxes todoId={todoId} />
						<TodoItemTextEditable todoId={todoId} />
					</li>
				)}
			</For>
		</ul>
	);
};

type TodoItemCheckboxesProps = {
	todoId: string;
};

const TodoItemCheckboxes: Component<TodoItemCheckboxesProps> = (props) => {
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

type TodoItemTextEditableProps = {
	todoId: string;
};

const TodoItemTextEditable: Component<TodoItemTextEditableProps> = (props) => {
	const todosStore = useTodosStore();

	const text = createStoreSubscription(() => ({
		selector: selectTodoText(props.todoId),
		key: "addCellListener",
		params: ["todos", props.todoId, "text", STORE_SUBSCRIPTION_NOOP],
	}));

	const onValueCommit: ComponentProps<typeof Editable.Root>["onValueCommit"] = (
		details,
	) => {
		updateTodoText(todosStore(), {
			todoId: props.todoId,
			text: details.value,
		});
	};

	return (
		<Editable.Root
			placeholder="Text"
			value={text().text}
			activationMode="click"
			onValueCommit={onValueCommit}
			{...props}
		>
			<Editable.Label>Text</Editable.Label>
			<Editable.Area>
				<Editable.Input />
				<Editable.Preview />
			</Editable.Area>
			<Editable.Context>
				{(editable) => (
					<Editable.Control>
						{editable().editing ? (
							<>
								<Editable.SubmitTrigger
									asChild={(props) => <Button variant="link" {...props()} />}
								>
									Save
								</Editable.SubmitTrigger>
								<Editable.CancelTrigger
									asChild={(props) => <Button variant="link" {...props()} />}
								>
									Cancel
								</Editable.CancelTrigger>
							</>
						) : (
							<Editable.EditTrigger
								asChild={(props) => <Button variant="link" {...props()} />}
							>
								Edit
							</Editable.EditTrigger>
						)}
					</Editable.Control>
				)}
			</Editable.Context>
		</Editable.Root>
	);
};

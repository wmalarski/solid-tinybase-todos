import { type Component, type ComponentProps, For } from "solid-js";
import {
	deleteTodo,
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
import { HStack, Stack, VStack } from "~/styled-system/jsx";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Checkbox } from "../ui/checkbox";
import { Dialog } from "../ui/dialog";
import { Editable } from "../ui/editable";
import { IconButton } from "../ui/icon-button";
import { XIcon } from "../ui/icons";

export const TodosList: Component = () => {
	const todos = createStoreSubscription(() => ({
		selector: selectTodos,
		key: "addRowIdsListener",
		params: ["todos", STORE_SUBSCRIPTION_NOOP],
	}));

	return (
		<VStack gap="4" p="4">
			<For each={todos()}>
				{(todoId) => (
					<Card.Root width="sm">
						<Card.Body>
							<HStack gap="4" pt="4">
								<TodoItemCheckboxes todoId={todoId} />
								<TodoItemTextEditable todoId={todoId} />
							</HStack>
						</Card.Body>
						<Card.Footer gap="3" width="sm">
							<Button variant="outline">Cancel</Button>
							<DeleteTodoItemDialog todoId={todoId} />
						</Card.Footer>
					</Card.Root>
				)}
			</For>
		</VStack>
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
		<Checkbox
			checked={isDone().done}
			onCheckedChange={onCheckedChange}
			aria-label="todo done"
		/>
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
			<Editable.Area>
				<Editable.Input aria-label="Text" />
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

type DeleteTodoItemDialogProps = {
	todoId: string;
};

const DeleteTodoItemDialog: Component<DeleteTodoItemDialogProps> = (props) => {
	const todosStore = useTodosStore();

	const onClick: ComponentProps<typeof Button>["onClick"] = () => {
		deleteTodo(todosStore(), props.todoId);
	};

	return (
		<Dialog.Root {...props}>
			<Dialog.Trigger
				asChild={(triggerProps) => <Button {...triggerProps()}>Remove</Button>}
			/>
			<Dialog.Backdrop />
			<Dialog.Positioner>
				<Dialog.Content>
					<Stack gap="8" p="6">
						<Stack gap="1">
							<Dialog.Title>Remove Todo</Dialog.Title>
						</Stack>
						<Stack gap="3" direction="row" width="full">
							<Dialog.CloseTrigger
								asChild={(closeTriggerProps) => (
									<Button
										{...closeTriggerProps()}
										variant="outline"
										width="full"
									>
										Cancel
									</Button>
								)}
							/>
							<Dialog.CloseTrigger
								asChild={(closeTriggerProps) => (
									<Button {...closeTriggerProps({ onClick })} width="full">
										Confirm
									</Button>
								)}
							/>
						</Stack>
					</Stack>
					<Dialog.CloseTrigger
						asChild={(closeTriggerProps) => (
							<IconButton
								{...closeTriggerProps()}
								aria-label="Close Dialog"
								variant="ghost"
								size="sm"
								position="absolute"
								top="2"
								right="2"
							>
								<XIcon />
							</IconButton>
						)}
					/>
				</Dialog.Content>
			</Dialog.Positioner>
		</Dialog.Root>
	);
};

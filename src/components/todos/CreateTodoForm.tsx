import type { Component, ComponentProps } from "solid-js";
import { createTodo } from "~/store/actions";
import { useTodosStore } from "~/store/context";
import { css } from "~/styled-system/css";
import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { Field } from "../ui/field";

export const CreateTodoForm: Component = () => {
	const todosStore = useTodosStore();

	const onSubmit: ComponentProps<"form">["onSubmit"] = (event) => {
		event.preventDefault();

		const formData = new FormData(event.currentTarget);
		const text = formData.get("text") as string;

		createTodo(todosStore(), text);
	};

	return (
		<form onSubmit={onSubmit} class={css({ p: "4" })}>
			<Card.Root>
				<Card.Body pt="4">
					<Field.Root>
						<Field.Label>Text</Field.Label>
						<Field.Input type="text" name="text" placeholder="Text" />
					</Field.Root>
				</Card.Body>
				<Card.Footer>
					<Button type="submit">Submit</Button>
				</Card.Footer>
			</Card.Root>
		</form>
	);
};

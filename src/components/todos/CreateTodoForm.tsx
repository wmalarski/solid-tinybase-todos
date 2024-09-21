import type { Component, ComponentProps } from "solid-js";
import { createTodo } from "~/store/actions";
import { useTodosStore } from "~/store/context";
import { css } from "~/styled-system/css";
import { Button } from "../ui/button";
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
		<form
			onSubmit={onSubmit}
			class={css({ display: "flex", flexDir: "column", gap: "2" })}
		>
			<Field.Root>
				<Field.Label>Text</Field.Label>
				<Field.Input type="text" name="text" placeholder="Text" />
			</Field.Root>
			<Button type="submit">Submit</Button>
		</form>
	);
};

import { createEffect } from "solid-js";
import "./app.css";
import { CreateTodoForm } from "./components/todos/CreateTodoForm";
import { TodosList } from "./components/todos/TodosList";
import { TodosStoreProvider } from "./store/context";
import { INITIAL_STORE_STATE } from "./store/create";

export default function App() {
	createEffect(() => {
		console.log("Websocket");
		const ws = new WebSocket("http://localhost:3000/_ws");

		ws.onopen = (event) => {
			console.log("OPEN", event);
			ws.send("Hello");
		};

		ws.onmessage = (event) => {
			console.log("MESSAGE", event);
		};
	});

	return (
		<TodosStoreProvider initialTodos={INITIAL_STORE_STATE}>
			<main>
				<CreateTodoForm />
				<TodosList />
			</main>
		</TodosStoreProvider>
	);
}

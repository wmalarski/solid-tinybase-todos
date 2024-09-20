import "./app.css";
import { TodosList } from "./components/todos/TodosList";
import { TodosStoreProvider } from "./store/context";
import { INITIAL_STORE_STATE } from "./store/create";

export default function App() {
	return (
		<TodosStoreProvider initialTodos={INITIAL_STORE_STATE}>
			<main>
				<TodosList />
			</main>
		</TodosStoreProvider>
	);
}

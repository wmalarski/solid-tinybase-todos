import type { Store } from "tinybase";
import { createLocalPersister } from "tinybase/persisters/persister-browser";
import { createStore } from "tinybase/with-schemas";
import type { Todo } from "./types";
import { getCreatedAt } from "./utils";

export const TODOS_TABLE_ID = "todos";

export const INITIAL_STORE_STATE = [
	{ createdAt: getCreatedAt(), done: false, text: "Hello" },
	{ createdAt: getCreatedAt(), done: false, text: "There" },
];

export const createTodosStore = (initialState: Todo[]) => {
	const store = createStore().setTablesSchema({
		[TODOS_TABLE_ID]: {
			createdAt: { type: "number" },
			done: { type: "boolean", default: false },
			text: { type: "string" },
		},
	});

	const persister = createLocalPersister(store as unknown as Store, "todos");

	const tables = {
		[TODOS_TABLE_ID]: Object.fromEntries(
			initialState.map((todo, index) => [index, todo]),
		),
	};

	persister.startAutoLoad([tables, {}]);
	persister.startAutoSave();

	return store;
};

export type TodosStore = ReturnType<typeof createTodosStore>;

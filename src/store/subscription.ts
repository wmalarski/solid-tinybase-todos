import { createMemo, onCleanup } from "solid-js";
import { createStore, reconcile } from "solid-js/store";
import { useTodosStore } from "./context";
import type { TodosStore } from "./create";

type OnlyListeners<T> = {
	[K in keyof T as K extends `add${string}Listener` ? K : never]: T[K];
};

type CreateStoreSubscriptionArgs<
	T extends object,
	K extends keyof OnlyListeners<TodosStore>,
> = {
	selector: (store: TodosStore) => T;
	args: Parameters<OnlyListeners<TodosStore>[K]>;
	key: K;
};

export const STORE_SUBSCRIPTION_NOOP = () => {};

export const createStoreSubscription = <
	T extends object,
	K extends keyof OnlyListeners<TodosStore>,
>({
	args,
	key,
	selector,
}: CreateStoreSubscriptionArgs<T, K>) => {
	const todosStore = useTodosStore();

	const value = createMemo(() => {
		const store = todosStore();
		const initialValue = selector(store);
		const [value, setValue] = createStore<T>(initialValue);

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		const unsafeStore = store as any;
		const params = args.slice(0, -1);

		const listenerId = unsafeStore[key](...params, (store: TodosStore) => {
			const updatedValue = selector(store);
			setValue(reconcile(updatedValue));
		});

		onCleanup(() => {
			store.delListener(listenerId);
		});

		return value;
	});

	return value;
};

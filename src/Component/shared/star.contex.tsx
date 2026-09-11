/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type React from "react";
import { createContext } from "react";

import * as useLocalStorageModule from "use-local-storage";
import type { Task } from "./tasks.context";
type UseLocalStorage = <T>(
  key: string,
  defaultValue: T
) => [T, (value: T) => void];


type IStarContext = {
	startedTaskId: Task["id"] | "null";
	setStartedTaskId: (tasks: Task["id"] | "") => void;
};
export const StarContext = createContext<IStarContext>({
	startedTaskId: "",

	setStartedTaskId: () => {},
});
export function StarProvider({ children }: { children: React.ReactNode }) {
 const useLocalstorage = ((useLocalStorageModule as any).default?.default ??
   (useLocalStorageModule as any).default) as UseLocalStorage;

	const [startedTaskId, setStartedTaskId] = useLocalstorage<Task["id"]>(
		"stared-task-id",
		"",
	);

	return (
		<StarContext value={{ startedTaskId, setStartedTaskId }}>
			{children}
		</StarContext>
	);
}

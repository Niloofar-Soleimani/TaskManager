/** biome-ignore-all lint/suspicious/noExplicitAny: <explanation> */
import type React from "react";
import { createContext } from "react";

import * as useLocalStorageModule from "use-local-storage";
import { v4 as uuidv4 } from "uuid";


type UseLocalStorage = <T>(
  key: string,
  defaultValue: T
) => [T, (value: T) => void];

export type Task = {
	id: string;
	title: string;
	isCompleted: boolean;
	category: "normal" | "financial";
	completedAtDate: string | null;
};

export const sampleTasks: Task[] = [
	{
		id: "b5d88b24-1c59-4ef4-9f5d-c4a5f2d9f001",
		title: "خرید مواد غذایی",
		isCompleted: false,
		category: "financial",
		completedAtDate: null,
	},
	{
		id: "2f9a3b61-8e76-4a4d-9d2b-91c2d9e8a002",
		title: "مطالعه ری‌اکت",
		isCompleted: true,
		category: "normal",
		completedAtDate: null,
	},
	{
		id: "7c1d8f35-0b7e-4a91-9e3f-5d4a8f7b3003",
		title: "تمرین تایپ‌اسکریپت",
		isCompleted: false,
		category: "normal",
		completedAtDate: null,
	},

	{
		id: "3e7c1a94-9b5d-4c81-a4d8-6e1f2b7c9006",
		title: "خرید نان",
		isCompleted: false,
		category: "financial",
		completedAtDate: null,
	},
	{
		id: "f9b2d6e8-4a17-4d83-b2c6-8d5f7a9e0007",
		title: "مطالعه مستندات React",
		isCompleted: true,
		category: "normal",
		completedAtDate: null,
	},

	{
		id: "6d2b9a48-3c71-4f95-b7d2-5a8e1c3f3010",
		title: "مطالعه جاوااسکریپت",
		isCompleted: false,
		category: "normal",
		completedAtDate: null,
	},
	{
		id: "1b7e4d95-8c32-4a6f-a2d9-7c5e3f8b4011",
		title: "نوشتن یادداشت روزانه",
		isCompleted: false,
		category: "normal",
		completedAtDate: null,
	},
	{
		id: "5f8a2c71-9d43-4b5e-b6a3-2d7c9e1f5012",
		title: "آبیاری گل‌ها",
		isCompleted: true,
		category: "normal",
		completedAtDate: null,
	},
	{
		id: "9c4e7b15-6f28-4d91-8c5b-1a3d7e2f6013",
		title: "تمیز کردن میز کار",
		isCompleted: false,
		category: "normal",
		completedAtDate: null,
	},
	{
		id: "2a8d5f93-1b67-4c8e-9f2d-6b4e1c7a7014",
		title: "برنامه‌ریزی برای فردا",
		isCompleted: true,
		category: "normal",
		completedAtDate: null,
	},
];

type ITasksContext = {
	tasks: Task[];
	setTasks: (tasks: Task[]) => void;
	toggleTaskCompleted: (id: Task["id"]) => void;
	createTask: (title: Task["title"], category: Task["category"]) => void;
	editTask: (id: Task["id"], title: Task["title"]) => void;
	deleteTask: (id: Task["id"]) => void;
};
export const TasksContext = createContext<ITasksContext>({
	tasks: [],
	setTasks: () => {},
	toggleTaskCompleted: () => {},
	createTask: () => {},
	editTask: () => {},
	deleteTask: () => {},
});
export function TasksProvider({ children }: { children: React.ReactNode }) {

	// const useLocalstorage = useLocalStorage.default.default;
	// const [tasks, setTasks] = useLocalstorage<Task[]>("tasks", [...sampleTasks]);
 const useLocalstorage = ((useLocalStorageModule as any).default?.default ??
   (useLocalStorageModule as any).default) as UseLocalStorage;


	const [tasks, setTasks] = useLocalstorage<Task[]>("tasks", []);
	const toggleTaskCompleted = (taskId: Task["id"]) => {
		const cloneTasks = [...tasks];
		const changeTasks = cloneTasks.map((ct) =>
			ct.id === taskId
				? {
						...ct,
						isCompleted: !ct.isCompleted,
						completedAtDate: !ct.isCompleted ? new Date().toISOString() : null,
					}
				: ct,
		);

		setTasks(changeTasks);
	};

	const createTask = (taskTitle: Task["title"], category: Task["category"]) => {
		const newTask: Task = {
			title: taskTitle,
			id: uuidv4(),
			isCompleted: false,
			category,
			completedAtDate: null,
		};
		const newTasks = [...tasks, newTask];
		setTasks(newTasks);
	};
	const editTask = (id: Task["id"], title: Task["title"]) => {
		const editedTasks = [...tasks].map((task) => {
			if (task.id !== id) return task;
			return {
				...task,
				title,
			};
		});
		setTasks(editedTasks);
	};

	const deleteTask = (id: Task["id"]) => {
		const deletedTasks = tasks.filter((task: { id: string; }) => task.id !== id);
		setTasks(deletedTasks);
	};
	return (
		<TasksContext
			value={{
				tasks,
				setTasks,
				toggleTaskCompleted,
				createTask,
				editTask,
				deleteTask,
			}}
		>
			{children}
		</TasksContext>
	);
}

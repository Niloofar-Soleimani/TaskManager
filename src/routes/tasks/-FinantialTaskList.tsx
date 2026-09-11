import { use } from "react";
import arrowdown from "../../assets/image/Arrow 1.png";
import noteImage from "../../assets/image/undraw_no-data_ig65 1.png";
import { TasksContext } from "../../Component/shared/tasks.context";
import { TaskItem } from "./-TaskItem";

export function FinantialTasksList() {
	const { tasks } = use(TasksContext);

	const finantialTask = tasks.filter((task) => {
		return task.category === "financial";
	});
	console.log(finantialTask, "finan");

	const isEmpty = finantialTask.length <= 0;
	return isEmpty ? (
		<div className=" w-full flex flex-col p-4 gap-8 justify-center items-center flex-1 dark:text-stone-100 dark:bg-gray-400">
			<img src={noteImage} alt=" لیست کار" />

			<p className=" text-stone-900 text-2xl font-bold text-center">
				فعلا کاری نداریم! 😁
			</p>
			<p className="text-stone-600 mt-3 text-center">
				میتونی از اون پایین <br />
				کار جدید تعریف کنی!
			</p>
			<img src={arrowdown} alt="کار جدید" />
		</div>
	) : (
		<div className=" w-full flex flex-col p-4 gap-8 justify-start items-center flex-1 overflow-y-auto dark:text-stone-100 dark:bg-gray-400">
			<div className="flex flex-col gap-2 w-full">
				{[...finantialTask]
					.sort((a, b) => Number(a.isCompleted) - Number(b.isCompleted))
					.map((t) => (
						<TaskItem
							key={t.id}
							title={t.title}
							id={t.id}
							isCompleted={t.isCompleted}
						/>
					))}
			</div>
			<div>
				<p className="text-rose-700 font-bold">
					{" "}
					تعداد کارهای باقی مانده :{" "}
					{finantialTask.filter((t) => t.isCompleted === false).length}{" "}
				</p>
			</div>
		</div>
	);
}

import { CheckCircleIcon, CircleIcon, StarIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { StarContext } from "../../Component/shared/star.contex";
import { type Task, TasksContext } from "../../Component/shared/tasks.context";
import { TaskDetailsSheet } from "./-TaskDetailsSheet";

type TaskItemProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
};
export function TaskItem({ id, title, isCompleted }: TaskItemProps) {
	const { toggleTaskCompleted } = use(TasksContext);
	const { startedTaskId, setStartedTaskId } = use(StarContext);
	const [isTaskDetailsSheetOpen, setTaskDetailsSheetOpen] = useState(false);
	const IsCopmpletedIcon = isCompleted ? CheckCircleIcon : CircleIcon;
	const isThisTaskStared = startedTaskId === id;
	const handleCompletedBtnClick = () => {
		return toggleTaskCompleted(id);
	};
	const handleStarBtnClick = () => {
		return setStartedTaskId(isCompleted ? "" : isThisTaskStared ? "" : id);
	};
	const closeTaskDetailsSheet = () => setTaskDetailsSheetOpen(false);
	const OpenTaskDetailsSheet = () => setTaskDetailsSheetOpen(true);
	return (
		<>
			{isTaskDetailsSheetOpen && (
				<TaskDetailsSheet
					onClose={closeTaskDetailsSheet}
					id={id}
					title={title}
					isCompleted={isCompleted}
				/>
			)}

			<div
				className={`flex w-full h-12 ${isCompleted ? "text-stone-600 line-through" : "text-stone-900"} `}
			>
				<button type="button" onClick={handleCompletedBtnClick}>
					<IsCopmpletedIcon size={24} />
				</button>

				<button
					type="button"
					onClick={OpenTaskDetailsSheet}
					className={`cursor-pointer flex-1 text-start px-3 ${isCompleted}`}
				>
					{title}
				</button>

				<button
					type="button"
					className={`cursor-pointer p-3 ${isThisTaskStared ? "text-orange-500" : null}`}
					onClick={handleStarBtnClick}
				>
					<StarIcon size={24} weight={isThisTaskStared ? "fill" : "regular"} />
				</button>
			</div>
		</>
	);
}

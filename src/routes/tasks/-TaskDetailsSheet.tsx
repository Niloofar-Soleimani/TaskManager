import { PencilSimpleIcon, TrashIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import { Btn } from "../../Component/Btn/Btn";
import { BottomSheet } from "../../Component/Sheet/Sheet";
import { Switch } from "../../Component/Switch/Switch";
import { type Task, TasksContext } from "../../Component/shared/tasks.context";
import { TopBar } from "../../Component/TopBar/TopBar";
import { DeleteTaskheet } from "./-DeleteTaskSheet";
import { EditTaskSheet } from "./-EditTaskSheet";

type TaskDetailsSheetProps = {
	id: Task["id"];
	title: Task["title"];
	isCompleted: Task["isCompleted"];
	onClose: () => void;
};

export function TaskDetailsSheet({
	onClose,
	id,
	title,
	isCompleted,
}: TaskDetailsSheetProps) {
	const { toggleTaskCompleted } = use(TasksContext);
	const [isEditMode, setEditMode] = useState(false);
	const [isDeleteMode, setDeleteMode] = useState(false);
	const openEditSheet = () => setEditMode(true);
	const openDeleteSheet = () => setDeleteMode(true);
	const closeEditSheet = () => setEditMode(false);
	const closeDeleteSheet = () => setDeleteMode(false);
	const handleToggleClick = () => toggleTaskCompleted(id);
	return (
		<>
			{isDeleteMode && (
				<DeleteTaskheet taskId={id} onClose={closeDeleteSheet} />
			)}

			{isEditMode && (
				<EditTaskSheet taskId={id} title={title} onClose={closeEditSheet} />
			)}

			<BottomSheet
				onClose={onClose}
				topBar={<TopBar title=" مشخصات" onCloseBtnClick={onClose} />}
			>
				<p className="text-stone-900 font-bold text-2xl text-center">{title}</p>
				<div className="flex flex-col gap-2">
					<button
						onClick={handleToggleClick}
						type="button"
						className="p-2 ps-4 flex items-center justify-between border-2 border-dashed border-stone-300 rounded-full  text-stone-900 font-bold"
					>
						{" "}
						وضعیت :
						<Switch readOnly checked={isCompleted}  />
					</button>
					<Btn
						title=" ویرایش"
						IconEnd={PencilSimpleIcon}
						style="light"
						color="neutral"
						onclick={openEditSheet}
					/>
					<Btn
						title=" حدف کن"
						IconEnd={TrashIcon}
						color="danger"
						style="light"
						onclick={openDeleteSheet}
					/>
				</div>
			</BottomSheet>
		</>
	);
}

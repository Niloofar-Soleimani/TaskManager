import { PencilSimpleIcon } from "@phosphor-icons/react";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { Btn } from "../../Component/Btn/Btn";
import { Input } from "../../Component/Input/Input";
import { BottomSheet } from "../../Component/Sheet/Sheet";
import { type Task, TasksContext } from "../../Component/shared/tasks.context";
import { TopBar } from "../../Component/TopBar/TopBar";

type EditTasksheetProps = {
	taskId: Task["id"];
	title: Task["title"];
	onClose: () => void;
};

export function EditTaskSheet({ onClose, taskId, title }: EditTasksheetProps) {
	const { editTask } = use(TasksContext);
	const [newTaskTitle, setNewTaskTitle] = useState(title);
	const handleEditTaskBtnClick = () => {
		editTask(taskId, newTaskTitle);

		setNewTaskTitle("");
		Swal.fire({
			title: "  ویرایش با موفقیت انجام شد ",
			toast: true,

			icon: "success",
			timer: 3000,
			timerProgressBar: true,
			showConfirmButton: false,
			position: "top",
		});
		onClose();
	};
	return (
		<BottomSheet
			className="z-10"
			onClose={onClose}
			topBar={<TopBar title="ویرایش کار " onCloseBtnClick={onClose} />}
		>
			<div className="flex flex-col p-4 gap-8 ">
				<label className="flex flex-col gap-2 ">
					<span className="text-stone-600"> اسم کار : </span>
					<Input
						value={newTaskTitle}
						onChange={(e) => setNewTaskTitle(e.target.value)}
					/>
				</label>
				<select
					name=""
					id=""
					className="rounded-full py-2 px-4 min-h-14 text-stone-900 border-2 border-stone-300 bg-stone-100 focus:bg-stone-200 placeholder:text-stone-400 
        focus:outline-none focus:border-orange-500 "
				>
					<option value="normal">روزانه</option>
					<option value="financial "> مالی </option>
				</select>
				<Btn
					title=" ویرایش کار "
					color="brand"
					style="filled"
					IconEnd={PencilSimpleIcon}
					onclick={handleEditTaskBtnClick}
				/>
			</div>
		</BottomSheet>
	);
}

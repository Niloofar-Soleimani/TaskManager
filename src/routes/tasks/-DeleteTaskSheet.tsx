import { CaretLeftIcon, TrashIcon } from "@phosphor-icons/react";
import { use } from "react";
import Swal from "sweetalert2";
import { Btn } from "../../Component/Btn/Btn";
import { BottomSheet } from "../../Component/Sheet/Sheet";
import { type Task, TasksContext } from "../../Component/shared/tasks.context";
import { TopBar } from "../../Component/TopBar/TopBar";

type DeleteTasksheetProps = {
	taskId: Task["id"];

	onClose: () => void;
};

export function DeleteTaskheet({ onClose, taskId }: DeleteTasksheetProps) {
	const { deleteTask } = use(TasksContext);

	const handleDeleteTaskBtnClick = () => {
		deleteTask(taskId);

		onClose();
		Swal.fire({
			toast: true,
			title: "  کار حدف شد ",
			icon: "success",
			timer: 3000,
			timerProgressBar: true,
			showConfirmButton: false,
			position: "top",
		});
	};
	return (
		<BottomSheet
			className="z-10"
			onClose={onClose}
			topBar={<TopBar title="حذف کار " onCloseBtnClick={onClose} />}
		>
			<p className="font-bold text-stone-900 text-2xl">
				مطمعنی که میخوای پاکش کنی؟
			</p>
			<div className="flex flex-col gap-2"></div>
			<Btn
				title="   نه نگش میدارم "
				color="brand"
				style="filled"
				IconEnd={CaretLeftIcon}
				onclick={onClose}
			/>

			<Btn
				title=" حذفش کن "
				color="danger"
				style="light"
				IconEnd={TrashIcon}
				onclick={handleDeleteTaskBtnClick}
			/>
		</BottomSheet>
	);
}

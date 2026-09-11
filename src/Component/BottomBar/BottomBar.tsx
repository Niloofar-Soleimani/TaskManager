import {
	CheckSquareIcon,
	HouseIcon,
	NotePencilIcon,
	PlusCircleIcon,
	PlusIcon,
	UserCircleIcon,
} from "@phosphor-icons/react";
import { Link, useLocation } from "@tanstack/react-router";
import { use, useState } from "react";
import Swal from "sweetalert2";
import { Btn } from "../Btn/Btn";
import { VoiceButton } from "../Btn/VoiceButton";
import { Input } from "../Input/Input";
import { BottomSheet } from "../Sheet/Sheet";
import { TasksContext } from "../shared/tasks.context";
import { TopBar } from "../TopBar/TopBar";
import "../../style.css";

// or via CommonJS

export function BottomBar() {
	const location = useLocation();
	const [iscreateTasskSheetOpen, setCreatetaskSheetOpen] = useState(false);
	const openCreateTaskSheet = () => setCreatetaskSheetOpen(true);
	const closeCreateTaskSheet = () => setCreatetaskSheetOpen(false);

	return (
		<>
			{iscreateTasskSheetOpen && (
				<CreateTaskSheet onClose={closeCreateTaskSheet} />
			)}
			<nav className="w-full flex items-center justify-between h-16 bg-stone-100 py-2 px-4 dark:text-stone-100 dark:bg-stone-900">
				<Link
					to="/home"
					activeProps={{ className: "font-bold text-stone-900 " }}
					className="font-bold text-xs flex-1 h-full text-stone-600 flex flex-col items-center justify-center gap-1 dark:text-stone-100 dark:bg-stone-900"
				>
					<HouseIcon
						weight={location.pathname === "/home" ? "fill" : "regular"}
						size={24}
					/>
					خانه
				</Link>

				<Link
					to="/tasks/"
					activeProps={{ className: "font-bold text-stone-900" }}
					className="flex-1 h-full text-xs text-stone-600 flex flex-col items-center justify-center gap-1 dark:text-stone-100 dark:bg-stone-900"
				>
					<CheckSquareIcon
						size={24}
						weight={location.pathname === "/tasks/" ? "fill" : "regular"}
					/>
					کارها
				</Link>
				<div className=" flex flex-1 h-full justify-center items-center dark:text-stone-100 dark:bg-stone-900">
					<button
						onClick={openCreateTaskSheet}
						type="button"
						className=" cursor-pointer p-2 size-12 flex items-center justify-center bg-orange-500 rounded-full"
					>
						<PlusIcon size={24} />
					</button>
				</div>
				<Link
					to="/financialTasks/FinancialTasks"
					activeProps={{ className: "font-bold text-stone-900" }}
					className="flex-1 h-full text-xs text-stone-600 flex flex-col items-center justify-center gap-1 dark:text-stone-100 dark:bg-stone-900"
				>
					<NotePencilIcon
						size={24}
						weight={
							location.pathname === "/financialTasks/FinancialTasks"
								? "fill"
								: "regular"
						}
					/>
					مالی
				</Link>
				<Link
					to="/profile/Profile"
					activeProps={{ className: "font-bold text-stone-900" }}
					className="flex-1 h-full text-xs text-stone-600 flex flex-col items-center justify-center gap-1 dark:text-stone-100 dark:bg-stone-900"
				>
					<UserCircleIcon
						size={24}
						weight={
							location.pathname === "/profile/Profile" ? "fill" : "regular"
						}
					/>
					پروفایل
				</Link>
			</nav>
		</>
	);
}

type CreateTasksheetProps = {
	onClose: () => void;
};

function CreateTaskSheet({ onClose }: CreateTasksheetProps) {
	const { createTask } = use(TasksContext);
	const [taskName, setTaskName] = useState("");
	const [taskCategory, setTaskCategory] = useState<"normal" | "financial">(
		"normal",
	);
	const handleCreateTaskBtnClick = () => {
		if (taskName === "") {
			Swal.fire({
				toast: true,
				title: " مقدار تسک را وارد کنید",
				icon: "warning",
				showConfirmButton: false,
				position: "top",
				timer: 3000,
				timerProgressBar: true,
			});
		} else {
			createTask(taskName, taskCategory);
			Swal.fire({
				toast: true,
				title: "  کار ثبت شد ",
				icon: "success",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: false,
				position: "top",
			});
			setTaskName("");
		}
	};

	return (
		<BottomSheet
			onClose={onClose}
			topBar={<TopBar title=" کار جدید " onCloseBtnClick={onClose} />}
		>
			<div className="flex flex-col p-4 gap-8 relative ">
				<label className="flex flex-col gap-2 ">
					<span className="text-stone-600"> اسم کار : </span>
					<VoiceButton
						category={taskCategory}
						onVoiceText={(text) => setTaskName(text)}
					/>
					<Input
						value={taskName}
						onChange={(e) => setTaskName(e.target.value)}
					/>
				</label>
				<select
					name=""
					value={taskCategory}
					onChange={(e) =>
						setTaskCategory((e.target.value as "normal") || "financial")
					}
					className="rounded-full py-2 px-4 min-h-14 text-stone-900 border-2 border-stone-300 bg-stone-100 focus:bg-stone-200 placeholder:text-stone-400 
        focus:outline-none focus:border-orange-500 "
				>
					<option value="normal">روزانه</option>
					<option value="financial"> مالی </option>
				</select>
				<Btn
					title="  ایجاد کار "
					color="brand"
					style="filled"
					IconEnd={PlusCircleIcon}
					onclick={handleCreateTaskBtnClick}
				/>
			</div>
		</BottomSheet>
	);
}

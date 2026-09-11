import { CaretLeft, CheckFatIcon, LightningIcon } from "@phosphor-icons/react";
import "../assets/font/vazirmatn.css";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { use, useState } from "react";
import donetask from "../assets/image/Frame 59.png";
import { BottomBar } from "../Component/BottomBar/BottomBar";
import { Btn } from "../Component/Btn/Btn";
import {
	generateRandomCelebrationMessage,
	generateRandomInspiringMessage,
} from "../Component/shared/randomMessages";
import { StarContext } from "../Component/shared/star.contex";
import { type Task, TasksContext } from "../Component/shared/tasks.context";
import { TopBar } from "../Component/TopBar/TopBar";

export const Route = createFileRoute("/home")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="flex flex-col w-full h-dvh  ">
			<TopBar title="یه چیز" />

			<Main />
			<BottomBar />
		</div>
	);
}

function Main() {
	const { tasks, toggleTaskCompleted } = use(TasksContext);
	const { startedTaskId, setStartedTaskId } = use(StarContext);
	const [isCelebration, setCelebration] = useState(false);
	const staredTask: Task = tasks.filter((t) => t.id === startedTaskId)?.[0];

	const navigate = useNavigate();
	const goToTaskPage = () => {
		navigate({ to: "/tasks/" });
	};
	const handleDidItBtnClick = () => {
		if (!startedTaskId) return;
		setStartedTaskId("");
		toggleTaskCompleted(startedTaskId);
		setCelebration(true);
	};
	if (isCelebration)
		return (
			<CelebrationContent onContinueBtnClick={() => setCelebration(false)} />
		);

	return startedTaskId ? (
		<main className="flex flex-col p-4 gap-8 items-center justify-center flex-1 text-center  dark:text-stone-100 dark:bg-gray-400">
			<p className="font-bold text-stone-900 ">
				{" "}
				{generateRandomInspiringMessage()}
			</p>
			<p className="font-bold text-3xl text-stone-900">{staredTask.title}</p>
			<Btn
				className=" w-full flex flex-wrap items-center justify-center gap-3 "
				title={" انجامش دادم "}
				IconTextStart={CheckFatIcon}
				color="brand"
				style="filled"
				onclick={handleDidItBtnClick}
			/>
		</main>
	) : (
		<main className="flex flex-col p-4 gap-8 items-center justify-center flex-1 text-center dark:text-stone-100 dark:bg-gray-400">
			<svg className="svgicon ">
				<text x="50%" y="50%" dy=".35em" text-anchor="middle">
					یه چیز ...!
				</text>
			</svg>
			<p className="font-bold text-stone-900">
				«چیز» بعدی‌مون چیه؟
				<br />
				(برو و از توی لیست کارها انتخابش کن!)
			</p>

			<Btn
				title={" مشاهده لیست کارها"}
				IconEnd={CaretLeft}
				color="brand"
				style="light"
				onclick={goToTaskPage}
			/>
		</main>
	);
}
type celebrationContentProps = {
	onContinueBtnClick: () => void;
};
function CelebrationContent({ onContinueBtnClick }: celebrationContentProps) {
	return (
		<main className="flex flex-col p-4 gap-8 items-center justify-center flex-1 text-center dark:text-stone-100 dark:bg-gray-400 ">
			<img src={donetask} alt="" />
			<p className="font-bold text-stone-900 text-3xl">
				{" "}
				{generateRandomCelebrationMessage()}{" "}
			</p>

			<Btn
				className=" w-full flex flex-wrap items-center justify-center gap-3  "
				title="ادامه بدیم "
				IconTextStart={LightningIcon}
				color="brand"
				style="light"
				onclick={onContinueBtnClick}
			/>
		</main>
	);
}

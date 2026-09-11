import {
	BarElement,
	CategoryScale,
	Chart as ChartJS,
	Legend,
	LinearScale,
	Title,
	Tooltip,
} from "chart.js";

import { Bar } from "react-chartjs-2";
import { TasksContext } from "../shared/tasks.context";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
);

import { use } from "react";
export function TasksBarChart() {
	const { tasks } = use(TasksContext);
	const completedTasksByDay = Array(7).fill(0);
	tasks.forEach((task) => {
		if (!task.isCompleted || !task.completedAtDate) {
			return;
		}
		const date = new Date(task.completedAtDate);
		const day = date.getDay();
		// چون نمودار ما از شنبه شروع می‌شود:
		const persianDayIndex = (day + 1) % 7;

		completedTasksByDay[persianDayIndex]++;
	});

	const data = {
		labels: [
			"شنبه",
			"یکشنبه",
			"دوشنبه",
			"سه‌شنبه",
			"چهارشنبه",
			"پنجشنبه",
			"جمعه",
		],

		datasets: [
			{
				label: "کارهای انجام شده",
				data: completedTasksByDay,
				backgroundColor: [
					"#FDBA74",
					"#C4B5FD",
					"#67E8F9",
					"#86EFAC",
					"#FDE68A",
					"#F9A8D4",
					"#A5B4FC",
				],
				borderRadius: 8,
			},
		],
	};

	const options = {
		responsive: true,

		scales: {
			y: {
				beginAtZero: true,
				ticks: {
					stepSize: 1,
				},
			},
		},
	};

	return (
		<div className="w-full rounded-2xl bg-stone-100 p-4 ">
			<h2 className="font-bold text-stone-900 mb-4">فعالیت این هفته</h2>

			<Bar data={data} options={options} />
		</div>
	);
}

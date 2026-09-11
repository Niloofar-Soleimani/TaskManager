import { createFileRoute } from "@tanstack/react-router";

import { BottomBar } from "../../Component/BottomBar/BottomBar";
import { TopBar } from "../../Component/TopBar/TopBar";
import "../../style.css";
import {
	MoonIcon,

	PencilSimpleIcon,
	SunIcon,
} from "@phosphor-icons/react";
import { UserCircleIcon } from "@phosphor-icons/react/dist/ssr";
import { use, useEffect, useState } from "react";
import { TasksBarChart } from "../../Component/chart/TaskBarChart";
import { ThemeContext } from "../../Component/shared/ThemeContext";

export const Route = createFileRoute("/profile/Profile")({
	component: RouteComponent,
});

function RouteComponent() {
	const [userName, setUserName] = useState("");

	const { isDark, toggleTheme } = use(ThemeContext);
	useEffect(() => {
		const saveUserName = localStorage.getItem("userName");
		if (saveUserName) {
			setUserName(saveUserName);
		}
	}, []);
	const HandleProfileName = (Name: string) => {
		setUserName(Name);
		localStorage.setItem("userName", Name);
	};

	return (
		<div className="w-full h-dvh flex flex-col dark:text-stone-100">
			<TopBar title={" کارها "} />

			<div className=" w-full h-dvh flex flex-col  justify-content-center items-center py-2 text-stone-900 gap-4 dark:text-stone-100 dark:bg-gray-400">
				<div className="flex w-100 flex-row-reverse justify-between items-center ">
					<button
						type="button"
						onClick={toggleTheme}
						className="
    flex
    items-center
    justify-center
    size-10
    rounded-full
    bg-stone-200
    dark:bg-stone-800
    border-b-amber-500
    border-2
     border-solid
    cursor-pointer
  "
					>
						{isDark ? (
							<SunIcon size={24} className="text-yellow-400" />
						) : (
							<MoonIcon size={24} className="text-stone-700  " />
						)}
					</button>

					<UserCircleIcon size={100} />
				</div>
				{/* <img
            src={profile}
            alt=""
            className="rounded-full w-25 h-25 object-cover profilaImage mt-5 "
          /> */}

				<div className="w-full px-14 flex flex-row  items-center justify-content-center  position-relative">
					<PencilSimpleIcon className="position-absolute cursor-pointer" />
					<input
						className="text-[14px]  px-1 "
						type="text"
						placeholder="  اسمتو بنویس..."
						value={userName}
						onChange={(e) => HandleProfileName(e.target.value)}
					/>
				</div>

				<TasksBarChart />
			</div>

			<BottomBar />
		</div>
	);
}

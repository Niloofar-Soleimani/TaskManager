import { createFileRoute } from "@tanstack/react-router";

import { BottomBar } from "../../Component/BottomBar/BottomBar";
import { TopBar } from "../../Component/TopBar/TopBar";
import { TasksList } from "../../routes/tasks/-TaskList";

export const Route = createFileRoute("/tasks/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="w-full h-dvh flex flex-col">
			<TopBar title={" کارها "} />
			<TasksList />

			<BottomBar />
		</div>
	);
}

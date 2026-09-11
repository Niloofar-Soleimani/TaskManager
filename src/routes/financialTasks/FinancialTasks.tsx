import { createFileRoute } from "@tanstack/react-router";
import { BottomBar } from "../../Component/BottomBar/BottomBar";
import { TopBar } from "../../Component/TopBar/TopBar";

import { FinantialTasksList } from "../tasks/-FinantialTaskList";

export const Route = createFileRoute("/financialTasks/FinancialTasks")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="w-full h-dvh flex flex-col">
			<TopBar title={" کارها "} />

			<FinantialTasksList />
			<BottomBar />
		</div>
	);
}

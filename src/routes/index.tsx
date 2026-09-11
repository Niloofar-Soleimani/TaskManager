import { createFileRoute, Navigate } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
	component: RouteComponent,
});

function RouteComponent() {
	const value = localStorage.getItem("starteed");
	const started: boolean = value ? JSON.parse(value) : false;
	const destination = started ? "/home" : "/intro";

	return <Navigate to={destination} />;
}

import { CircleNotchIcon } from "@phosphor-icons/react";

export function pending() {
	return (
		<div className="flex flex-col p-4 gap-8 items-center justify-center flex-1 text-center">
			<CircleNotchIcon
				size={96}
				weight="regular"
				className="text-orange-500 animate-spin"
			/>
		</div>
	);
}

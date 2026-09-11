import { XIcon } from "@phosphor-icons/react";

type TopBarProps = {
	title: string;
	onCloseBtnClick?: () => void;
};

export function TopBar({ title, onCloseBtnClick }: TopBarProps) {
	const date = new Date();
	const today = new Intl.DateTimeFormat("fa-ir", {
		year: "numeric",
		month: "long",
		day: "numeric",
	}).format(date);

	return (
		<div className="bg-stone-100 flex min-h-16 gap-2 py-2 px-2 items-center justify-between  dark:text-stone-100 dark:bg-stone-900 ">
			{onCloseBtnClick ? (
				<button
					type="button"
					onClick={onCloseBtnClick}
					className="p-3 size-12 flex justify-center items-center cursor-pointer  dark:text-stone-100"
				>
					<XIcon size={24} className="text-stone-700  dark:text-stone-100" />
				</button>
			) : (
				<div className="" />
			)}
			<div className="flex justify-start ml-10">
				<p className="font-bold  text-stone-900   dark:text-stone-100">
					{title}{" "}
				</p>
			</div>

			<div className="flex justify-end">
				<p className=" text-stone-900 text-[14px]  dark:text-stone-100">
					{" "}
					امروز : {today}{" "}
				</p>
			</div>

			<div className="size-4" />
		</div>
	);
}

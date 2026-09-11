import type { Icon } from "@phosphor-icons/react";

type BtnType = {
	title: string;
	IconTextStart?: Icon;
	IconEnd?: Icon;
	IconTextEnd?: Icon;
	IconStart?: Icon;
	disabled?: boolean;
	color?: "brand" | "neutral" | "danger";
	style?: "light" | "filled";
	onclick?: () => void;
	className?: string;
};

export function Btn({
	title,
	IconTextStart,
	IconEnd,
	IconTextEnd,
	IconStart,
	disabled = false,
	style,
	color,
	className = "",
	onclick,
}: BtnType) {
	const btnStyles = getBtnStyles(color, style);
	const iconWeight = style === "filled" ? "fill" : "regular";
	return (
		<button
			type="button"
			className={`${btnStyles} ${className}`}
			disabled={disabled}
			onClick={onclick}
		>
			{IconStart && <IconStart size={20} weight="fill" />}
			{IconTextStart && <IconTextStart size={20} weight={iconWeight} />}

			<span>{title}</span>
			{IconTextEnd && <IconTextEnd size={20} weight={iconWeight} />}
			{IconEnd && <IconEnd size={20} weight={iconWeight} />}
		</button>
	);
}

function getBtnStyles(
	color?: "brand" | "neutral" | "danger",
	style?: "light" | "filled",
) {
	const baseStyle =
		"px-4 py-2 items-center w-full rouded-[20%]  flex justify-between rounded-full min-h-12 cursor-pointer font-bold";
	let finalClassName = "";
	const disabeledBtn = " disabled:bg-stone-300 disabled:text-stone-500 ";
	finalClassName += baseStyle;
	finalClassName += disabeledBtn;
	switch (color) {
		case "brand":
			if (style === "filled")
				finalClassName += " bg-orange-500 text-orange-100 ";
			if (style === "light")
				finalClassName += " bg-orange-100 text-orange-500 ";
			break;
		case "neutral":
			if (style === "filled") finalClassName += " bg-stone-500 text-stone-100 ";
			if (style === "light") finalClassName += " bg-stone-100 text-stone-900 ";
			break;
		case "danger":
			if (style === "filled") finalClassName += " bg-red-500 text-stone-100 ";
			if (style === "light") finalClassName += " bg-red-100 text-red-600 ";
			break;

		default:
			break;
	}
	return finalClassName;
}

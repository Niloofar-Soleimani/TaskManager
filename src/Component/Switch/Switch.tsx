type SwitchProps = {
	checked: boolean;
	disabled?: boolean;
	onClick?: (checked: boolean) => void;
	readOnly?: boolean;
};

export function Switch({
	checked = false,
	disabled = false,
	onClick,
	readOnly = false,
}: SwitchProps) {
	const containerStyle = calculateContainerStyle(checked, disabled, readOnly);

	const handleStyle = calculateHandleStyle(checked);

	const Tag = readOnly ? "div" : "button";

	const handleClick = () => {
		if (!disabled && !readOnly) {
			onClick?.(!checked);
		}
	};

	return (
		<Tag
			className={containerStyle}
			{...(!readOnly
				? {
						type: "button",
						disabled,
						onClick: handleClick,
					}
				: {})}
		>
			<div className={handleStyle} />
		</Tag>
	);
}

function calculateContainerStyle(
	checked: boolean,
	disabled: boolean,
	readOnly: boolean,
) {
	const baseStyle = "rounded-full border-2 w-14 h-8 items-center flex";

	const onStyle = "bg-orange-500 border-orange-500 justify-end";

	const offStyle = "bg-stone-300 border-stone-500 p-1 justify-start";

	let finalStyle = baseStyle;

	if (!readOnly) {
		finalStyle += " cursor-pointer";
	}

	finalStyle += checked ? ` ${onStyle}` : ` ${offStyle}`;

	if (disabled) {
		finalStyle += " opacity-50";
	}

	return finalStyle;
}

function calculateHandleStyle(checked: boolean ) {
	const baseStyle = "m-1 rounded-full";

	const onStyle = "size-6 bg-stone-50";

	const offStyle = "size-4 bg-stone-500";

	return `${baseStyle} ${checked ? onStyle : offStyle}`;
}

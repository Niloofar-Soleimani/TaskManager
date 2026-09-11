import { createContext, useState } from "react";

type ThemeContextType = {
	isDark: boolean;
	toggleTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType>({
	isDark: false,
	toggleTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem("theme") === "dark";
	});

	const toggleTheme = () => {
		setIsDark((prev) => {
			const newValue = !prev;

			localStorage.setItem("theme", newValue ? "dark" : "light");

			return newValue;
		});
	};

	return (
		<ThemeContext
			value={{
				isDark,
				toggleTheme,
			}}
		>
			<div className={isDark ? "dark" : ""}>{children}</div>
		</ThemeContext>
	);
}

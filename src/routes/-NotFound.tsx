import { CaretLeft } from "@phosphor-icons/react";
import { useNavigate } from "@tanstack/react-router";
import NotFoundImage from "../assets/image/NotFound.png";
import { Btn } from "../Component/Btn/Btn";

export function NotFound() {
	const navigate = useNavigate();
	const goToHomePage = () => {
		navigate({ to: "/home" });
	};
	return (
		<div className=" w-full h-dvh flex flex-col p-4 gap-8 justify-center items-center">
			<p className="text-stone-900 text-3xl font-bold">ارور ۴۰۴ - پیدا نشد!</p>
			<img src={NotFoundImage} alt=" خطا404 " />

			<p className="text-stone-600">
				صفحه ای که دنبالش هستی <br /> وجود نداره یا گم شده 🥲
			</p>

			<Btn
				IconEnd={CaretLeft}
				title="  بریم به خونه"
				color="brand"
				style="light"
				onclick={goToHomePage}
			/>
		</div>
	);
}

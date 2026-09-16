import { CaretLeft } from "@phosphor-icons/react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Btn } from "../Component/Btn/Btn";
  import goToStar from "../assets/image/go to stars.png"
   import goal from "../assets/image/Logo.png"
export const Route = createFileRoute("/intro")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const HandleGoToHomePage = () => {
		localStorage.setItem("started", JSON.stringify(true));
		navigate({ to: "/home" });
	};
	return (
    <div className=" w-full h-dvh flex flex-col p-4 gap-8 justify-center items-center">
      <img src={goToStar} alt=" موشک فضا" />
      <div className="flex flex-col text-stone-600">
        <img src={goal} alt="  لوگو هدف" />
        <p>وقت رسیدن به اهدافه! 🤩</p>
      </div>

      <Btn
        IconEnd={CaretLeft}
        title=" شروع"
        color="brand"
        style="filled"
        onclick={HandleGoToHomePage}
      />
    </div>
  );
}

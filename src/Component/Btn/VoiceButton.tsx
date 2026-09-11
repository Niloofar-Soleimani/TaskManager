import { MicrophoneIcon } from "@phosphor-icons/react";
import Swal from "sweetalert2";

type VoiceButtonProps = {
	category: "normal" | "financial";
	onVoiceText?: (text: string) => void;
};

export function VoiceButton({ category, onVoiceText }: VoiceButtonProps) {
	const handleVoiceClick = () => {
		// Speech Recognition مرورگر
		const SpeechRecognition =
			window.SpeechRecognition || window.webkitSpeechRecognition;

		// اگر مرورگر پشتیبانی نکرد
		if (!SpeechRecognition) {
			Swal.fire({
				title: "مرورگر شما از تشخیص صدا پشتیبانی نمی‌کند",
				toast: true,
				icon: "error",
				timer: 3000,
				timerProgressBar: true,
				showConfirmButton: false,
				position: "top",
			});

			return;
		}

		const recognition = new SpeechRecognition();

		// زبان فارسی
		recognition.lang = "fa-IR";

		// 🔴 برای Todo بهتر است بعد از تمام شدن جمله متوقف شود
		recognition.continuous = false;

		// دریافت نتیجه‌های موقت
		recognition.interimResults = true;

		recognition.onresult = (event) => {
			const result = event.results[0][0];
			const transcript = result.transcript.trim();

			console.log("متن تشخیص داده شده:", transcript);

			// فقط نتیجه نهایی
			if (event.results[0].isFinal && transcript) {
				// 🟢 متن را به والد می‌فرستیم
				onVoiceText?.(transcript);
				// Swal.fire({
				//   title: "کار ثبت شد 🎉",
				//   text: transcript,
				//   toast: true,
				//   icon: "success",
				//   timer: 3000,
				//   timerProgressBar: true,
				//   showConfirmButton: false,
				//   position: "top",
				// });
			}
		};

		// اگر خطایی در تشخیص صدا رخ داد
		recognition.onerror = () => {
			Swal.fire({
				title: "تشخیص صدا انجام نشد",
				toast: true,
				icon: "error",
				timer: 2500,
				showConfirmButton: false,
				position: "top",
			});
		};

		recognition.start();

		console.log(`🎤 در حال گوش دادن برای دسته: ${category}`);
	};

	return (
		<button
			type="button"
			className="absolute top-16 left-7 z-20"
			onClick={handleVoiceClick}
		>
			<MicrophoneIcon
				size={24}
				className="text-stone-700 cursor-pointer hover:text-orange-500"
			/>
		</button>
	);
}

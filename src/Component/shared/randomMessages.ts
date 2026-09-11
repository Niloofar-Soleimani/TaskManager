function generateRandomMessageGenerator(message: string[]) {
	return () => {
		const length = message.length;
		if (length === 0) throw new Error("message array is empty!");
		const randomIndex = Math.floor(Math.random() * length);
		return message[randomIndex];
	};
}

const inspiringMessage = [
	"انجامش بده 💪",
	"تو می‌تونی 💪",
	"من بهت ایمان دارم 💪",
];
const celebtrationMessage = [
	"باریکلا!",
	"عالی بود!",
	"آفرین به تو!",
	"دمت گرم رفیق!",
	"فوق‌العاده بودی!",
	"ایولا داری!",
	" خودتو دوست داشته باش",
];

export const generateRandomInspiringMessage =
	generateRandomMessageGenerator(inspiringMessage);
export const generateRandomCelebrationMessage =
	generateRandomMessageGenerator(celebtrationMessage);

interface SpeechRecognitionEvent extends Event {
	results: SpeechRecognitionResultList;
}

interface SpeechRecognitionResultList {
	[index: number]: SpeechRecognitionResult;
	length: number;
}

interface SpeechRecognitionResult {
	[index: number]: SpeechRecognitionAlternative;
	isFinal: boolean;
}

interface SpeechRecognitionAlternative {
	transcript: string;
	confidence: number;
}

interface SpeechRecognition extends EventTarget {
	lang: string;
	continuous: boolean;
	interimResults: boolean;

	start(): void;
	stop(): void;

	onresult: ((event: SpeechRecognitionEvent) => void) | null;

	onerror: ((event: Event) => void) | null;

	onend: (() => void) | null;
}

interface Window {
	SpeechRecognition: {
		new (): SpeechRecognition;
	};

	webkitSpeechRecognition: {
		new (): SpeechRecognition;
	};
}

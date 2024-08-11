import { useState, useEffect, useRef } from "react";

interface Command {
    command: string;
    callback: () => void;
}

const useSpeechRecognition = (
    commands: Command[],
): [boolean, string, () => void, () => void] => {
    const [isListening, setIsListening] = useState(false);
    const [transcript, setTranscript] = useState("");
    const recognitionRef = useRef<SpeechRecognition | null>(null);

    useEffect(() => {
        const SpeechRecognition =
            window.SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            console.error("Browser doesn't support speech recognition.");
            return;
        }

        const recognition = new SpeechRecognition();
        recognition.continuous = true;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognitionRef.current = recognition;

        recognition.onstart = () => {
            setIsListening(true);
        };

        recognition.onend = () => {
            setIsListening(false);
            if (isListening) {
                recognition.start(); // Restart recognition if it stops unintentionally
            }
        };

        recognition.onresult = (event: SpeechRecognitionEvent) => {
            const currentTranscript = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");

            setTranscript(currentTranscript);

            commands.forEach(({ command, callback }) => {
                if (
                    currentTranscript
                        .toLowerCase()
                        .includes(command.toLowerCase())
                ) {
                    callback();
                }
            });
        };

        return () => {
            recognition.stop();
        };
    }, [isListening, commands]);

    const startListening = () => {
        if (recognitionRef.current && !isListening) {
            recognitionRef.current.start();
            setIsListening(true);
        }
    };

    const stopListening = () => {
        if (recognitionRef.current && isListening) {
            recognitionRef.current.stop();
            setIsListening(false);
        }
    };

    return [isListening, transcript, startListening, stopListening];
};

export default useSpeechRecognition;

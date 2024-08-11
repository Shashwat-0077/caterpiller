"use client";
import React from "react";

export default function Hears() {
    const handleOnClick = () => {
        console.log("Started");

        const SpeechRecognition =
            window.SpeechRecognition || window.webkitSpeechRecognition;

        if (!SpeechRecognition) {
            console.error(
                "SpeechRecognition is not supported in this browser.",
            );
            return;
        }

        const recognition = new SpeechRecognition();

        recognition.onstart = () => {
            console.log("Speech recognition started");
        };

        recognition.onresult = (event) => {
            console.log("Speech recognition result received:", event);
        };

        recognition.onerror = (event) => {
            console.error("Speech recognition error:", event.error);
        };

        recognition.onend = () => {
            console.log("Speech recognition ended");
        };

        recognition.start();
    };

    return (
        <div>
            <button onClick={handleOnClick}>Start</button>
        </div>
    );
}

"use client";

import { Button } from "@/components/ui/button";
import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { BatteryForm } from "@/forms/BatteryForm";
import { BrakesForm } from "@/forms/BrakesForm";
import { EngineForm } from "@/forms/EngineForm";
import { ExteriorForm } from "@/forms/ExteriorForm";
import { TireForm } from "@/forms/TireForm";
import { useBatteryStore } from "@/store/BattryStore";
import { useBrakesStore } from "@/store/BrakesStore";
import { useEngineStore } from "@/store/EngineStore";
import { useExteriorStore } from "@/store/ExteriorStore";
import { useTireStore } from "@/store/Tirestore";

import React from "react";

export default function Details({ params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);
    const { tires } = useTireStore();
    const { battery } = useBatteryStore();
    const { brakes } = useBrakesStore();
    const { engine } = useEngineStore();
    const { exterior } = useExteriorStore();

    const handleOnClick = async () => {
        let response: Response;
        response = await fetch("/api/tires", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({ ...tires, inspectionID: parseInt(id) }), // Convert the object to a JSON string
        });
        console.log(await response.json());

        response = await fetch("/api/battery", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({ ...battery, inspectionID: parseInt(id) }), // Convert the object to a JSON string
        });
        console.log(await response.json());

        response = await fetch("/api/brakes", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({ ...brakes, inspectionID: parseInt(id) }), // Convert the object to a JSON string
        });
        console.log(await response.json());

        response = await fetch("/api/engine", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({ ...engine, inspectionID: parseInt(id) }), // Convert the object to a JSON string
        });
        console.log(await response.json());

        response = await fetch("/api/exterior", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", // This tells the server that the body is JSON
            },
            body: JSON.stringify({ ...exterior, inspectionID: parseInt(id) }), // Convert the object to a JSON string
        });
        console.log(await response.json());

        console.log({ tires, battery, brakes, engine, exterior });
    };

    return (
        <div className="w-full">
            <div className="w-full">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1622645636770-11fbf0611463?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="truck"
                    aspectRatio={8 / 2}
                    className="rounded-lg"
                />
            </div>

            <div className="pt-12">
                <TireForm active />
                <BatteryForm active />
                <ExteriorForm active />
                <BrakesForm active />
                <EngineForm active />
            </div>

            <Button onClick={handleOnClick}>Submit All</Button>
        </div>
    );
}

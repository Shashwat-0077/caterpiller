import ImageWithFallback from "@/components/ui/ImageWithFallback";
import { BatteryForm } from "@/forms/BatteryForm";
import { BrakesForm } from "@/forms/BrakesForm";
import { EngineForm } from "@/forms/EngineForm";
import { ExteriorForm } from "@/forms/ExteriorForm";
import { TireForm } from "@/forms/TireForm";

import React from "react";

export default function Details({ params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);

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
                <TireForm />
                <BatteryForm />
                <ExteriorForm />
                <BrakesForm />
                <EngineForm />
            </div>
        </div>
    );
}

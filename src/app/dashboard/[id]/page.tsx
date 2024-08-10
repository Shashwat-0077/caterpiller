import ImageWithFallback from "@/components/ui/ImageWithFallback";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { BatteryForm } from "@/forms/BatteryForm";
import { BrakeForm } from "@/forms/BrakesForm";
import { EngineForm } from "@/forms/EngineForm";
import { ExteriorForm } from "@/forms/ExteriorForm";
import { TireForm } from "@/forms/TireForm";
import React from "react";

export default function Details({ params }: { params: { id: string } }) {
    const { id } = params;
    console.log(id);

    return (
        <div className="h-[300px] w-full">
            <div className="w-full">
                <ImageWithFallback
                    src="https://images.unsplash.com/photo-1622645636770-11fbf0611463?q=80&w=2673&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="truck"
                    aspectRatio={8 / 2}
                    className="rounded-lg"
                />

                <div>
                    <Accordion
                        type="single"
                        collapsible
                        defaultValue="item-1"
                        className="px-52 pt-6"
                    >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>Tires</AccordionTrigger>
                            <AccordionContent>
                                <TireForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-2">
                            <AccordionTrigger>Battery</AccordionTrigger>
                            <AccordionContent>
                                <BatteryForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-3">
                            <AccordionTrigger>Exterior</AccordionTrigger>
                            <AccordionContent>
                                <ExteriorForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-4">
                            <AccordionTrigger>Brakes</AccordionTrigger>
                            <AccordionContent>
                                <BrakeForm />
                            </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="item-5">
                            <AccordionTrigger>Engine</AccordionTrigger>
                            <AccordionContent>
                                <EngineForm />
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </div>
    );
}

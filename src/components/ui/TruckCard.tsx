import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { InspectionForm } from "@/forms/inspectionForm";
import { Button } from "./button";

type PropType = {
    name: string;
    description: string;
    image: string;
};

const TruckCard = ({ image, description, name }: PropType) => {
    return (
        <div className="max-w-sm overflow-hidden rounded bg-white p-4 shadow-lg">
            <ImageWithFallback className="w-full" src={image} alt={name} />
            <div className="px-6 py-4">
                <div className="mb-2 text-center text-xl font-bold">{name}</div>
                <p className="text-center text-base text-gray-700">
                    {description}
                </p>
                <Dialog>
                    <DialogTrigger className="bg-gray-900 px-5 py-3 text-white">
                        New Inspection
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle className="pb-7 text-center text-2xl">
                                Inspection Form
                            </DialogTitle>
                            <InspectionForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default TruckCard;

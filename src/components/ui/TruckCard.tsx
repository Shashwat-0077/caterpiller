import React from "react";
import ImageWithFallback from "./ImageWithFallback";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "./dialog";
import { InspectionForm } from "@/forms/inspectionForm";

type PropType = {
    id: number;
    name: string;
    description: string;
    image: string;
};

const TruckCard = ({ id, image, description, name }: PropType) => {
    return (
        <div className="max-w-sm overflow-hidden rounded bg-white p-4 shadow-lg">
            <ImageWithFallback className="w-full" src={image} alt={name} />
            <div className="px-6 py-4">
                <div className="mb-2 text-center text-xl font-bold">{name}</div>
                <p className="text-center text-base text-gray-700">
                    {description}
                </p>
                <Dialog>
                    <DialogTrigger>Open</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Are you absolutely sure?</DialogTitle>
                            <DialogDescription>
                                This action cannot be undone. This will
                                permanently delete your account and remove your
                                data from our servers.
                            </DialogDescription>
                            <InspectionForm />
                        </DialogHeader>
                    </DialogContent>
                </Dialog>
            </div>
        </div>
    );
};

export default TruckCard;

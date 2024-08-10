import React from "react";
import ImageWithFallback from "./ImageWithFallback";

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
                <button className="mx-auto block rounded-xl bg-gray-500 px-4 py-2 text-white hover:bg-gray-700">
                    View
                </button>
            </div>
        </div>
    );
};

export default TruckCard;
